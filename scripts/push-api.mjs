import fs from "node:fs";
import path from "node:path";

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "LongYingZhang";
const REPO = "uidea";
const BRANCH = "gh-pages";
const DIST = process.argv[2];
const API = "https://api.github.com";

if (!TOKEN) {
  console.error("missing GITHUB_TOKEN");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
  "User-Agent": "uidea-deploy",
};

async function api(method, url, body) {
  const res = await fetch(`${API}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${url} -> ${res.status} ${text.slice(0, 300)}`);
  }
  return text ? JSON.parse(text) : null;
}

function walk(dir, base = dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else out.push(path.relative(base, full));
  }
  return out;
}

const files = walk(DIST);
console.log(`files: ${files.length}`);

// 1. current ref
const ref = await api("GET", `/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`);
const parentSha = ref.object.sha;
const parentCommit = await api("GET", `/repos/${OWNER}/${REPO}/git/commits/${parentSha}`);
const baseTree = parentCommit.tree.sha;
console.log(`parent ${parentSha.slice(0, 7)} tree ${baseTree.slice(0, 7)}`);

// 2. blobs
const tree = [];
for (const rel of files) {
  const content = fs.readFileSync(path.join(DIST, rel));
  const blob = await api("POST", `/repos/${OWNER}/${REPO}/git/blobs`, {
    content: content.toString("base64"),
    encoding: "base64",
  });
  tree.push({ path: rel.split(path.sep).join("/"), mode: "100644", type: "blob", sha: blob.sha });
}
console.log(`blobs created: ${tree.length}`);

// 3. tree
const newTree = await api("POST", `/repos/${OWNER}/${REPO}/git/trees`, {
  base_tree: baseTree,
  tree,
});

// 4. commit
const commit = await api("POST", `/repos/${OWNER}/${REPO}/git/commits`, {
  message: `deploy: ${new Date().toISOString()}`,
  tree: newTree.sha,
  parents: [parentSha],
});

// 5. update ref
await api("PATCH", `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
  sha: commit.sha,
  force: true,
});

console.log(`PUSHED ${commit.sha}`);
