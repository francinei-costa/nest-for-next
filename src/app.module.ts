import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo disponível globalmente na aplicação{como o arquivo .env}
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      //conexão com o banco de dados na nuvem
      synchronize: process.env.DB_SYNCHRONIZE === '1', //true,
      url: process.env.DATABASE_URL,
      // host: process.env.DB_HOST,
      // port: 5432,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === '1', // false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
