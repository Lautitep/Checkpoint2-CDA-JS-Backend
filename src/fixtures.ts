import datasource from "./lib/datasource";
import { Country } from "./entities/country.entity";

async function createFixtures() {
  await datasource.initialize();

  const countryRepository = datasource.getRepository(Country);

  const countries = [
    { name: "France", code: "FR", emoji: "🇫🇷", continentCode: "EU" },
    { name: "Italie", code: "IT", emoji: "🇮🇹", continentCode: "EU" },
    { name: "Belgium", code: "BE", emoji: "🇧🇪", continentCode: "EU" },
    { name: "Espagne", code: "ES", emoji: "🇪🇸", continentCode: "EU" },
    { name: "Maroc", code: "MA", emoji: "🇲🇦", continentCode: "AF" },
    { name: "Japon", code: "JP", emoji: "🇯🇵", continentCode: "AS" },
  ];

  for (const countryData of countries) {
    const country = countryRepository.create(countryData);
    await countryRepository.save(country);
  }

  console.log("Fixtures have been successfully inserted.");
  await datasource.destroy();
}

createFixtures().catch((error) => {
  console.error("Error inserting fixtures: ", error);
});
