import { SuperHeroDataBase } from "../database/SuperHeroDataBase";
import { SuperHero } from "../models/SuperHero";
import { SuperHeroDB } from "../types";

export class SuperHeroBusiness {
  public async getHeroes(q: string | undefined) {
    const superHeroDataBase = new SuperHeroDataBase();
    const heroesDB = await superHeroDataBase.findHeroes(q);
    const heroes: SuperHero[] = heroesDB.map(
      (heroDB) =>
        new SuperHero(heroDB.id, heroDB.name, heroDB.power, heroDB.created_at)
    );
    return heroes;
  }
  public async createHero(input: any) {
    const { id, name, power } = input;

    if (typeof id !== "string") {
      throw new Error("'id' deve ser string");
    }

    if (typeof name !== "string") {
      throw new Error("'name' deve ser string");
    }

    if (typeof power !== "string") {
      throw new Error("'power' deve ser string");
    }

    const superHeroDataBase = new SuperHeroDataBase();
    const superHeroDBExists = await superHeroDataBase.findHeroById(id);
    if (superHeroDBExists) {
      throw new Error("'id' já existe");
    }

    const newHero = new SuperHero(id, name, power, new Date().toISOString()); // yyyy-mm-ddThh:mm:sssZ

    const newHeroDB: SuperHeroDB = {
      id: newHero.getId(),
      name: newHero.getName(),
      power: newHero.getPower(),
      created_at: newHero.getCreatedAt(),
    };

    await superHeroDataBase.insertHero(newHeroDB);
    return newHeroDB;
  }
  public async updateHero(idToEdit: any, input: any) {
    const { newId, newName, newPower } = input;
    if (newId !== undefined) {
      if (typeof newId !== "string") {
        throw new Error("'id' deve ser string");
      }

      if (newId.length < 1) {
        throw new Error("'id' deve possuir no mínimo 1 caractere");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        throw new Error("'name' deve ser string");
      }

      if (newName.length < 1) {
        throw new Error("'name' deve possuir no mínimo 1 caractere");
      }
    }

    if (newPower !== undefined) {
      if (typeof newPower !== "string") {
        throw new Error("'power' deve ser string");
      }

      if (newPower.length < 1) {
        throw new Error("'power' deve possuir no mínimo 1 caractere");
      }
    }

    const superHeroDataBase = new SuperHeroDataBase();
    const superHeroDB = await superHeroDataBase.findHeroById(idToEdit);
    if (!superHeroDB) {
      throw new Error("'id' não existe");
    }

    const newHero = new SuperHero(
      newId,
      newName,
      newPower,
      superHeroDB.created_at
    );

    const newHeroDB: SuperHeroDB = {
      id: newHero.getId() || superHeroDB.id,
      name: newHero.getName() || superHeroDB.name,
      power: newHero.getPower() || superHeroDB.power,
      created_at: newHero.getCreatedAt(),
    };

    await superHeroDataBase.updateHeroById(idToEdit, newHeroDB);
    return newHeroDB;
  }
  public async deleteHero(idToDelete: any) {
    const superHeroDataBase = new SuperHeroDataBase();
    const superHeroDB = await superHeroDataBase.findHeroById(idToDelete);
    if (!superHeroDB) {
      throw new Error("Id não encontrada");
    }
    await superHeroDataBase.deleteHeroById(idToDelete)
  }
}
