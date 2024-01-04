/*
  Warnings:

  - Added the required column `price` to the `listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listing" ADD COLUMN     "price" TEXT NOT NULL;
