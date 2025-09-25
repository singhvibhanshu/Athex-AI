/*
  Warnings:

  - Added the required column `userId` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `OutputImage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OutputImageStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- AlterTable
ALTER TABLE "public"."Model" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."OutputImage" ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "status" "public"."OutputImageStatusEnum" NOT NULL DEFAULT 'Pending',
ALTER COLUMN "imageUrl" SET DEFAULT '';
