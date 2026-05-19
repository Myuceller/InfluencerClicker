-- AlterTable
ALTER TABLE "GameSave" ADD COLUMN "thumbnails" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "GameSave" ADD COLUMN "totalLikes" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "GameSave" ADD COLUMN "money" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- Preserve previous progress as total likes for existing saves.
UPDATE "GameSave" SET "totalLikes" = "likes" WHERE "totalLikes" = 0;

-- AlterTable
ALTER TABLE "GameSave" DROP COLUMN "dopamine";
ALTER TABLE "GameSave" DROP COLUMN "clout";
