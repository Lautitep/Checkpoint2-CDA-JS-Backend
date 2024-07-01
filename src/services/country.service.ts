import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import { Country, CountryCreateInput } from "../entities/country.entity";

export default class CountryService {
  db: Repository<Country>;

  constructor() {
    this.db = datasource.getRepository(Country);
  }

  async listCountries() {
    return this.db.find();
  }

  async findCountryByCode(code: string) {
    return await this.db.findOne({ where: { code }});
  }

  async create({ name, code, emoji, continentCode }: CountryCreateInput) {
    const newCountry = this.db.create({name, code, emoji, continentCode});
    return await this.db.save(newCountry);
  }

  async findCountriesByContinent(continentCode: string) {
    return await this.db.find({ where: { continentCode } });
  }
}
