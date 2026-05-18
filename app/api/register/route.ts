import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    name?: string;
    password?: string;
  };
  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim();
  const password = body.password;

  if (!email || !password || password.length < 8) {
    return Response.json(
      { error: "이메일과 8자 이상의 비밀번호를 입력하세요." },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return Response.json(
      { error: "이미 가입된 이메일입니다." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      name: name || null,
      passwordHash,
      gameSave: {
        create: {
          upgradeLevels: {},
          achievements: [],
        },
      },
    },
  });

  return Response.json({ ok: true }, { status: 201 });
}
