/*
  Warnings:

  - A unique constraint covering the columns `[collegeEmail]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `studentprofile` ADD COLUMN `collegeEmail` VARCHAR(100) NOT NULL DEFAULT '',
    ADD COLUMN `parentPhone` VARCHAR(191) NULL,
    ADD COLUMN `studentPhone` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `StudentProfile_collegeEmail_key` ON `StudentProfile`(`collegeEmail`);
