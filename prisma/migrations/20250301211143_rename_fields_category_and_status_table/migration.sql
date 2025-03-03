/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Status` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status]` on the table `Status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_name_idx";

-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Status_name_idx";

-- DropIndex
DROP INDEX "Status_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "name",
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- CreateIndex
CREATE INDEX "Category_category_idx" ON "Category"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_key" ON "Status"("status");

-- CreateIndex
CREATE INDEX "Status_status_idx" ON "Status"("status");
