-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSave" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "likes" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "followers" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dopamine" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "clout" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "upgradeLevels" JSONB NOT NULL,
    "achievements" JSONB NOT NULL,
    "playTimeSeconds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameSave_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GameSave_userId_key" ON "GameSave"("userId");

-- AddForeignKey
ALTER TABLE "GameSave"
ADD CONSTRAINT "GameSave_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
