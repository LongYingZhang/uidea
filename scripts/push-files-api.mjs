import fs from "node:fs";
import path from "node:path";

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "LongYingZhang";
const REPO = "uidea";
const API = "https://api.github.com";
const branch = process.argv[2];
const repoRoot = process.argv[3];
const relPaths = process.argv.slice(4);

if (!TOKEN || !branch || !repoRoot || relPaths.length === 0) {
  console.error("usage: GITHUB_TOKEN=... node push-files-api.mjs <branch> <repoRoot> <files...>");
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
  if (!res.ok) throw new Error(`${method} ${url} -> ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

const ref = await api("GET", `/repos/${OWNER}/${REPO}/git/ref/heads/${branch}`);
const parentSha = ref.object.sha;
const parentCommit = await api("GET", `/repos/${OWNER}/${REPO}/git/commits/${parentSha}`);

const tree = [];
for (const rel of relPaths) {
  const content = fs.readFileSync(path.join(repoRoot, rel));
  const blob = await api("POST", `/repos/${OWNER}/${REPO}/git/blobs`, {
    content: content.toString("base64"),
    encoding: "base64",
  });
  tree.push({ path: rel, mode: "100644", type: "blob", sha: blob.sha });
}

const newTree = await api("POST", `/repos/${OWNER}/${REPO}/git/trees`, {
  base_tree: parentCommit.tree.sha,
  tree,
});

const commit = await api("POST", `/repos/${OWNER}/${REPO}/git/commits`, {
  message: process.env.COMMIT_MESSAGE || "chore: sync files",
  tree: newTree.sha,
  parents: [parentSha],
});

await api("PATCH", `/repos/${OWNER}/${REPO}/git/refs/heads/${branch}`, {
  sha: commit.sha,
  force: true,
});

console.log(`PUSHED ${branch} ${commit.sha}`);
