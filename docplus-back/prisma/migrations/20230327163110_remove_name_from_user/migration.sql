/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Medic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medic" ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";
