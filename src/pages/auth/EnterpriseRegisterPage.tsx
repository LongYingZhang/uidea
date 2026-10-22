import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandLogo } from "../../components/ui/BrandLogo";

const SIZES = ["1-10 人", "11-50 人", "51-200 人", "200 人以上"] as const;

export function EnterpriseRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    size: SIZES[1] as string,
    intro: "",
  });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company.trim() || !form.contact.trim() || !form.email.trim()) {
      setError("请填写企业名称、联系人与邮箱");
      return;
    }
    localStorage.setItem("uidea.enterprise", form.company.trim());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-margin py-16">
      <div className="w-full max-w-[520px]">
        <BrandLogo className="mb-8 h-9 w-auto" />

        <h1 className="m-0 text-[18px] font-semibold text-white">企业入驻</h1>
        <p className="ui-text-meta mt-1 text-[#8a8a8a]">
          发布任务、招募设计师，打通从需求到交付的全流程。
        </p>

        <form onSubmit={submit} className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">企业名称</span>
            <input
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="ui-input"
              placeholder="公司全称"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">联系人</span>
            <input
              value={form.contact}
              onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
              className="ui-input"
              placeholder="姓名 / 职位"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">企业邮箱</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="ui-input"
              placeholder="name@company.com"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">团队规模</span>
            <select
              value={form.size}
              onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
              className="ui-input"
            >
              {SIZES.map((s) => (
                <option key={s} value={s} className="bg-[#201f1f]">
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="ui-text-label text-[#9ea1a2]">业务简介</span>
            <textarea
              value={form.intro}
              onChange={(e) => setForm((f) => ({ ...f, intro: e.target.value }))}
              rows={4}
              className="ui-input h-auto resize-none py-2.5"
              placeholder="简单介绍你们的业务与视觉需求类型"
            />
          </label>

          {error ? (
            <p className="ui-text-label mb-0 text-[#ff8b84] sm:col-span-2">{error}</p>
          ) : null}

          <div className="flex items-center gap-3 sm:col-span-2">
            <button type="submit" className="ui-btn ui-btn-primary">
              提交入驻申请
            </button>
            <Link to="/register" className="ui-text-meta text-[#8a8a8a] hover:text-white">
              返回个人注册
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
