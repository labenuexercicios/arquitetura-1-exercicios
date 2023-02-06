import { BaseDataBase } from "./BaseDataBase";
import { SuperHeroDB } from "../types";

export class SuperHeroDataBase extends BaseDataBase {
  public static TABLE_HEROES = "super_heroes";
  public async findHeroes(q: string | undefined) {
    let heroesDB;

    if (q) {
      const result: SuperHeroDB[] = await BaseDataBase.connection(
        SuperHeroDataBase.TABLE_HEROES
      ).where("name", "LIKE", `%${q}%`);

      heroesDB = result;
    } else {
      const result: SuperHeroDB[] = await BaseDataBase.connection(
        SuperHeroDataBase.TABLE_HEROES
      );

      heroesDB = result;
    }

    return heroesDB;
  }
  public async findHeroById(id: string) {
    const [superHeroDB]: SuperHeroDB[] | undefined[] =
      await BaseDataBase.connection(SuperHeroDataBase.TABLE_HEROES).where({
        id,
      });

    return superHeroDB;
  }

  public async insertHero(newHeroDB: SuperHeroDB) {
    await BaseDataBase.connection(SuperHeroDataBase.TABLE_HEROES).insert(
      newHeroDB
    );
  }

  public async updateHeroById(id: string, newHeroDB: SuperHeroDB) {
    await BaseDataBase.connection(SuperHeroDataBase.TABLE_HEROES)
      .update(newHeroDB)
      .where({id});
  }
  public async deleteHeroById(id: string) {
    await BaseDataBase.connection(SuperHeroDataBase.TABLE_HEROES)
    .del()
    .where({id})
  }
}
