import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandLogo } from "../../components/ui/BrandLogo";

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || form.password.length < 6) {
      setError("请填写昵称、邮箱，密码不少于 6 位");
      return;
    }
    localStorage.setItem("uidea.user", form.email.trim());
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-margin py-16">
      <div className="w-full max-w-[380px]">
        <BrandLogo className="mb-8 h-9 w-auto" />

        <h1 className="m-0 text-[18px] font-semibold text-white">创建个人账号</h1>
        <p className="ui-text-meta mt-1 text-[#8a8a8a]">
          设计师、创作者、学生都可以从这里开始。
        </p>

        <form onSubmit={submit} className="mt-7">
          <label className="mb-3 flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">昵称</span>
            <input value={form.name} onChange={set("name")} className="ui-input" placeholder="展示给其他创作者的名字" />
          </label>
          <label className="mb-3 flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">邮箱</span>
            <input type="email" value={form.email} onChange={set("email")} className="ui-input" placeholder="you@example.com" />
          </label>
          <label className="mb-1 flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">密码</span>
            <input type="password" value={form.password} onChange={set("password")} className="ui-input" placeholder="至少 6 位" />
          </label>

          {error ? <p className="ui-text-label mt-2 mb-0 text-[#ff8b84]">{error}</p> : null}

          <button type="submit" className="ui-btn ui-btn-primary mt-5 w-full">
            注册
          </button>
        </form>

        <div className="ui-text-meta mt-5 flex items-center justify-between text-[#8a8a8a]">
          <Link to="/login" className="hover:text-white">
            已有账号，去登录
          </Link>
          <Link to="/register/enterprise" className="hover:text-white">
            企业入驻
          </Link>
        </div>
      </div>
    </div>
  );
}
