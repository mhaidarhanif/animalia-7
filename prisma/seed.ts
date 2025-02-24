import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type DataSeedAnimal = {
  name: string;
  color?: string;
  age?: number;
};

let dataSeedAnimals: DataSeedAnimal[] = [
  { name: "Aardvark" },
  { name: "Bear" },
  { name: "Cat" },
  { name: "Dog" },
  { name: "Elephant" },
  { name: "Flamingo" },
  { name: "Goose" },
];

async function seedAnimals() {
  for (const dataSeedAnimal of dataSeedAnimals) {
    const animal = await prisma.animal.create({
      data: dataSeedAnimal,
    });

    console.log(`Animal: ${animal.name}`);
  }
}

async function main() {
  await seedAnimals();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
