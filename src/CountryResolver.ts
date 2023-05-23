import CountryEntity from "./CountryEntity";
import { CountryInput } from "./CountryEntity";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "./db";

@Resolver(CountryEntity)
export class CountryResolver {
  @Query(() => [CountryEntity])
  async countries(): Promise<CountryEntity[]> {
    const countries = await dataSource.getRepository(CountryEntity).find();

    return countries.map((country) => ({
      ...country, emoji: country.emoji || ""
    }));
  }

  @Query(() => [CountryEntity])
  async countriesByCode(@Arg("code") code: string): Promise<CountryEntity[]> {
    const countries = await dataSource
      .getRepository(CountryEntity)
      .find({ where: { code } });

    return countries.map((country) => ({
      ...country, name: country.name, emoji: country.emoji || "" }));
  }

  @Mutation(() => CountryEntity)
  async createCountry(@Arg("data") data: CountryInput): Promise<CountryEntity> {
    return await dataSource.getRepository(CountryEntity).save(data);
  }
}
