/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Proposal` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusName` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_statusId_fkey";

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "categoryId",
DROP COLUMN "statusId",
ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD COLUMN     "statusName" TEXT NOT NULL,
ALTER COLUMN "countVote" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_statusName_fkey" FOREIGN KEY ("statusName") REFERENCES "Status"("status") ON DELETE RESTRICT ON UPDATE CASCADE;
