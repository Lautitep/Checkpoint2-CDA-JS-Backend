import { DataSource } from "typeorm";

export default new DataSource({
    type: "sqlite",
    database: 'country',
    synchronize: true,
    entities: ["src/entities/*.ts"],
    logging: ["query", "error"],
    subscribers: [],
    migrations: [],
});
