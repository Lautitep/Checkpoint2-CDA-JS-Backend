import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import CountryService from "../services/country.service";
import { Country, CountryCreateInput } from "../entities/country.entity";

@Resolver()
export default class CountryResolver {
  @Query(() => [Country])
  async countries() {
    return await new CountryService().listCountries();
  }

  @Query(() => Country)
  async findCountry(@Arg("code") code: string) {
    const country = await new CountryService().findCountryByCode(code);
    return country;
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg("continentCode") continentCode: string) {
    return await new CountryService().findCountriesByContinent(continentCode);
  }

  @Mutation(() => Country)
  async createCountry(@Arg("infos") infos: CountryCreateInput) {
    const country = await new CountryService().findCountryByCode(infos.code);
    if (country) {
      throw new Error("Ce pays existe déjà !");
    }
    const newCountry = await new CountryService().create(infos);
    return newCountry;
  }
}
