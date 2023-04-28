import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/interfaces/user.entity';
import { CreateTableAddress1682689822190 } from './migration/1682689822190-create_table_address';
import { CreateTableState1682689796971 } from './migration/1682689796971-create_table_state';
import { CreateTableUser1682688473580 } from './migration/1682688473580-create_table_user';
import { CreateTableCity1682689807706 } from './migration/1682689807706-create_table_city';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      synchronize: true,
      autoLoadEntities: true,
      entities: [UserEntity],
      migrations: [
        CreateTableCity1682689807706,
        CreateTableState1682689796971,
        CreateTableUser1682688473580,
        CreateTableAddress1682689822190,
      ],
      migrationsRun: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
