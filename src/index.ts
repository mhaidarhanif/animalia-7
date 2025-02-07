import { Hono } from "hono";

const app = new Hono();

type Animal = {
  id: number;
  name: string;
  color?: string;
  isEndangered?: boolean;
};

let animals: Animal[] = [
  { id: 1, name: "Aardvark" },
  { id: 2, name: "Bear" },
  { id: 3, name: "Cat" },
  { id: 4, name: "Dog" },
  { id: 5, name: "Elephant" },
  { id: 6, name: "Flamingo" },
  { id: 7, name: "Goose" },
];

app.get("/", (c) => {
  return c.json({
    message: "Hello World!",
  });
});

// GET /animals
app.get("/animals", (c) => {
  return c.json(animals);
});

// GET /animals/:id
app.get("/animals/:id", (c) => {
  const id = Number(c.req.param("id"));

  const animal = animals.find((animal) => {
    return animal.id === id;
  });

  if (!animal) {
    return c.json({ message: "Animal not found" }, 404);
  }

  return c.json(animal);
});

// POST /animals
app.post();

// DELETE /animals
app.delete();

// DELETE /animals/:id
app.delete();

// PATCH /animals/:id
app.patch();

// PUT /animals/:id
app.put();

export default app;
