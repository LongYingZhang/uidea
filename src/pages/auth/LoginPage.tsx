import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandLogo } from "../../components/ui/BrandLogo";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) {
      setError("请输入有效邮箱，密码不少于 6 位");
      return;
    }
    localStorage.setItem("uidea.user", email.trim());
    navigate("/console/profile");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-margin py-16">
      <div className="w-full max-w-[380px]">
        <BrandLogo className="mb-8 h-9 w-auto" />

        <h1 className="m-0 text-[18px] font-semibold text-white">登录 Uidea</h1>
        <p className="ui-text-meta mt-1 text-[#8a8a8a]">
          连接品牌与设计师，共建设计社区。
        </p>

        <form onSubmit={submit} className="mt-7">
          <label className="mb-3 flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">邮箱</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="ui-input"
              autoComplete="email"
            />
          </label>

          <label className="mb-1 flex flex-col gap-1">
            <span className="ui-text-label text-[#9ea1a2]">密码</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="至少 6 位"
              className="ui-input"
              autoComplete="current-password"
            />
          </label>

          {error ? (
            <p className="ui-text-label mt-2 mb-0 text-[#ff8b84]">{error}</p>
          ) : null}

          <button type="submit" className="ui-btn ui-btn-primary mt-5 w-full">
            登录
          </button>
        </form>

        <div className="ui-text-meta mt-5 flex items-center justify-between text-[#8a8a8a]">
          <Link to="/register" className="hover:text-white">
            注册账号
          </Link>
          <button type="button" className="hover:text-white">
            忘记密码
          </button>
        </div>

        <p className="ui-text-label mt-10 text-[#5f6364]">
          原型环境：任意邮箱 + 6 位以上密码即可进入控制台。
        </p>
      </div>
    </div>
  );
}
