/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `GoogleAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `GoogleAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoogleAccount" ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GoogleAccount_uid_key" ON "GoogleAccount"("uid");
