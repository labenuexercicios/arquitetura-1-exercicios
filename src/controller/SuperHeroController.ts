import { Request, Response } from "express";
import { SuperHeroBusiness } from "../business/SuperHeroBusiness";

export class SuperHeroController {
  public getHeroes = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined;
      const superHeroBusiness = new SuperHeroBusiness();
      const output = await superHeroBusiness.getHeroes(q);
      res.status(200).send(output);
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
  };
  public createHero = async (req: Request, res: Response) => {
    try {
      const { id, name, power } = req.body;

      const input = {
        id,
        name,
        power,
      };

      const superHeroBusiness = new SuperHeroBusiness();
      const output = await superHeroBusiness.createHero(input);

      res.status(201).send(output);
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
  };
  public updateHero = async (req: Request, res: Response) => {
    try {
      const idToEdit = req.params.id;

      const newId = req.body.id;
      const newName = req.body.name;
      const newPower = req.body.power;

      const input = {
        idToEdit,
        newId,
        newName,
        newPower,
      };
      const superHeroBusiness = new SuperHeroBusiness();
      const output = await superHeroBusiness.updateHero(idToEdit, input);

      res.status(201).send({ message: "Atualização realizada com sucesso" });
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
  };
  public deleteHero = async (req: Request, res: Response) => {
    try {
      const idToDelete = req.params.id;
      const superHeroBusiness = new SuperHeroBusiness()
      superHeroBusiness.deleteHero(idToDelete)
      res.status(200).send({ message: "Super Heroi deletado com sucesso!" });
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
  };
}
