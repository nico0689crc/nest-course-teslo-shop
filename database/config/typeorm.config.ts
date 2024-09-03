import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';

import InitSeeder from '../seeds/init.seeder';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const options = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_CONTAINER_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER || 'your_username',
  password: process.env.POSTGRES_PASSWORD || 'your_password',
  database: process.env.POSTGRES_DB || 'your_database',
  entities: [__dirname + '/../../src/**/*.entity.ts'],
  migrations: [__dirname + '/../migrations/**/*.ts'],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
// npm run mig-cre --name=create-table-products
// npm run typeorm migration:generate -d ./database/config/typeorm.config.ts database/migrations/create-product-table
