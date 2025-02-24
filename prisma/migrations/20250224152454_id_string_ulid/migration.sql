/*
  Warnings:

  - The primary key for the `Animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Habitat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_AnimalToHabitat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[slug]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_animalId_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalToHabitat" DROP CONSTRAINT "_AnimalToHabitat_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalToHabitat" DROP CONSTRAINT "_AnimalToHabitat_B_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_pkey",
ADD COLUMN     "slug" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Animal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Animal_id_seq";

-- AlterTable
ALTER TABLE "Food" DROP CONSTRAINT "Food_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "animalId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Food_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Food_id_seq";

-- AlterTable
ALTER TABLE "Habitat" DROP CONSTRAINT "Habitat_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Habitat_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Habitat_id_seq";

-- AlterTable
ALTER TABLE "_AnimalToHabitat" DROP CONSTRAINT "_AnimalToHabitat_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_AnimalToHabitat_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_slug_key" ON "Animal"("slug");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToHabitat" ADD CONSTRAINT "_AnimalToHabitat_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToHabitat" ADD CONSTRAINT "_AnimalToHabitat_B_fkey" FOREIGN KEY ("B") REFERENCES "Habitat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
