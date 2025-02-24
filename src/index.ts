import { Hono } from "hono";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

const app = new Hono();

type Animal = {
  id: number;
  name: string;
  color?: string;
};

let dataAnimals: Animal[] = [
  { id: 1, name: "Aardvark" },
  { id: 2, name: "Bear" },
  { id: 3, name: "Cat" },
  { id: 4, name: "Dog" },
  { id: 5, name: "Elephant" },
  { id: 6, name: "Flamingo" },
  { id: 7, name: "Goose" },
];

app.get("/", async (c) => {
  return c.json({
    message: "Animalia API (Batch 7)",
    description: "A simple API for animals",
  });
});

// GET /animals
app.get("/animals", async (c) => {
  const animals = await prisma.animal.findMany({
    relationLoadStrategy: "join",
    orderBy: { createdAt: "asc" },
    include: {
      habitats: true,
      foods: true,
    },
  });

  return c.json(animals);
});

// GET /animals/:id
app.get("/animals/:id", async (c) => {
  const id = c.req.param("id");

  const animal = await prisma.animal.findUnique({
    where: { id },
  });

  if (!animal) {
    return c.json({ message: "Animal not found" }, 404);
  }

  return c.json(animal);
});

// POST /animals
app.post("/animals", async (c) => {
  const bodyJson = await c.req.json();

  const animal = await prisma.animal.create({
    data: {
      name: bodyJson.name,
      age: bodyJson.age,
      color: bodyJson.color,
    },
  });

  return c.json(animal);
});

// DELETE /animals
app.delete("/animals", async (c) => {
  const result = await prisma.animal.deleteMany();

  return c.json(result);
});

// DELETE /animals/:id
app.delete("/animals/:id", async (c) => {
  const id = c.req.param("id");

  const animal = await prisma.animal.delete({
    where: { id },
  });

  return c.json(animal);
});

// PATCH /animals/:id
app.patch("/animals/:id", async (c) => {
  const id = c.req.param("id");
  const bodyJson = await c.req.json();

  const animal = await prisma.animal.update({
    where: { id },
    data: {
      name: bodyJson.name,
      age: bodyJson.age,
      color: bodyJson.color,
    },
  });

  return c.json(animal);
});

// PUT /animals/:id
app.put();

export default app;
