import CountryEntity from './CountryEntity';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'sqlite',
  database: './checkpoint_02',
  synchronize: true,
  entities: [CountryEntity],
  logging: ["query", "error"]
})

export default dataSource;