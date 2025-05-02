import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { AdminsModule } from "./admins/admins.module";
import { Admin } from "./admins/models/admin.model";
import { RegionModule } from "./region/region.module";
import { StatusModule } from "./status/status.module";
import { DistrictModule } from "./district/district.module";
import { StoreModule } from "./store/store.module";
import { District } from "./district/models/district.model";
import { Region } from "./region/models/region.model";
import { Status } from "./status/models/status.model";
import { BotModule } from "./bot/bot.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constans";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule],
      }),
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [User, Admin, District, Region, Status],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminsModule,
    RegionModule,
    StatusModule,
    DistrictModule,
    StoreModule,
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
