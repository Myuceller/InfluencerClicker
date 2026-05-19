"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, MessageCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";

export function AuthPanel() {
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    if (mode === "register") {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        setMessage(body.error ?? "회원가입에 실패했습니다.");
        setPending(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setMessage(result?.error ? "이메일 또는 비밀번호를 확인하세요." : "");
    setPending(false);
  }

  if (status === "loading") {
    return (
      <Card className="p-4 text-sm text-white/70">
        로그인 상태 확인 중...
      </Card>
    );
  }

  if (session?.user) {
    return (
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-white/60">계정</p>
          <p className="font-semibold">{session.user.name || session.user.email}</p>
          <p className="text-sm text-white/70">이 기기의 진행도가 계정에 동기화됩니다.</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => signOut({ redirect: false })}
          className="h-11 gap-2 px-4"
        >
          <LogOut size={16} />
          로그아웃
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-white/60">계정</p>
          <h2 className="text-xl font-bold">
            {mode === "login" ? "로그인" : "회원가입"}
          </h2>
        </div>
        <Button
          variant="ghost"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="h-10 gap-2 px-3 text-sm"
        >
          {mode === "login" ? <UserPlus size={16} /> : <LogIn size={16} />}
          {mode === "login" ? "회원가입" : "로그인"}
        </Button>
      </div>

      <form className="grid gap-3" onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="닉네임"
            className="h-11 rounded-lg border border-white/15 bg-black/15 px-3 text-white outline-none placeholder:text-white/40"
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일"
          required
          className="h-11 rounded-lg border border-white/15 bg-black/15 px-3 text-white outline-none placeholder:text-white/40"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호 8자 이상"
          required
          minLength={8}
          className="h-11 rounded-lg border border-white/15 bg-black/15 px-3 text-white outline-none placeholder:text-white/40"
        />
        {message && <p className="text-sm text-pink-100">{message}</p>}
        <Button disabled={pending} className="h-11 gap-2 px-4">
          {mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}
          {pending
            ? "처리 중..."
            : mode === "login"
              ? "로그인"
              : "계정 만들기"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-white/45">
        <span className="h-px flex-1 bg-white/10" />
        또는
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => signIn("kakao")}
          className="h-11 gap-2 px-4"
        >
          <MessageCircle size={16} />
          Kakao 로그인
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => signIn("google")}
          className="h-11 gap-2 px-4"
        >
          <span className="text-base font-bold">G</span>
          Google 로그인
        </Button>
      </div>
    </Card>
  );
}
