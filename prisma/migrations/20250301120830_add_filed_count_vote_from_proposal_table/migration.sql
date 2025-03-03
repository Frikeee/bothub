/*
  Warnings:

  - Added the required column `countVote` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "countVote" INTEGER NOT NULL;
