"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, MessageCircle, UserCircle, UserPlus, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";

export function AuthPanel() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
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
      <Card className="p-3 text-sm text-white/70">
        로그인 상태 확인 중...
      </Card>
    );
  }

  return (
    <>
      <Card className="flex items-center justify-between gap-3 p-2.5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-left transition hover:bg-white/5"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-pink-100">
            <UserCircle size={20} />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase text-white/50">
              계정
            </span>
            <span className="block truncate text-sm font-semibold">
              {session?.user
                ? session.user.name || session.user.email
                : "로그인 / 회원가입"}
            </span>
          </span>
        </button>
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="h-10 gap-2 px-3"
        >
          <LogIn size={16} />
          열기
        </Button>
      </Card>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 px-4 py-6 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.18 }}
              onMouseDown={(event) => event.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="p-4 shadow-2xl shadow-black/35">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-white/60">
                      계정
                    </p>
                    <h2 className="text-xl font-bold">
                      {session?.user
                        ? "계정 동기화"
                        : mode === "login"
                          ? "로그인"
                          : "회원가입"}
                    </h2>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    className="size-10 px-0"
                  >
                    <X size={18} />
                  </Button>
                </div>

                {session?.user ? (
                  <div className="grid gap-4">
                    <div className="rounded-lg border border-white/10 bg-black/15 p-3">
                      <p className="font-semibold">
                        {session.user.name || session.user.email}
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        이 기기의 진행도가 계정에 동기화됩니다.
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => signOut({ redirect: false })}
                      className="h-11 gap-2 px-4"
                    >
                      <LogOut size={16} />
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex justify-end">
                      <Button
                        variant="ghost"
                        onClick={() => setMode(mode === "login" ? "register" : "login")}
                        className="h-10 gap-2 px-3 text-sm"
                      >
                        {mode === "login" ? (
                          <UserPlus size={16} />
                        ) : (
                          <LogIn size={16} />
                        )}
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
                        {mode === "login" ? (
                          <LogIn size={16} />
                        ) : (
                          <UserPlus size={16} />
                        )}
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
                  </>
                )}
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
