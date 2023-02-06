import express, { Request, Response } from "express";
import cors from "cors";
import { SuperHeroController } from "./controller/SuperHeroController";
import { SuperHeroDataBase } from "./database/SuperHeroDataBase";

const app = express();
app.use(cors());
app.use(express.json());

const heroController = new SuperHeroController();

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});
app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/heroes", heroController.getHeroes);

app.post("/heroes", heroController.createHero);

app.put("/heroes/:id", heroController.updateHero);

app.delete("/heroes/:id", heroController.deleteHero);
