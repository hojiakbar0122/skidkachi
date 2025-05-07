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
import { TypeModule } from './type/type.module';
import { CategoryModule } from './category/category.module';
import { DiscountsModule } from './discounts/discounts.module';
import { SocialMediaTypeModule } from './social_media_type/social_media_type.module';
import { StoreSocialLinksModule } from './store_social_links/store_social_links.module';
import { Bot } from "./bot/model/bot.model";
import { Otp } from "./users/models/otp.model";
import { Address } from "./bot/model/address.model";
import { AdsModule } from './ads/ads.module';
import { FavouritesModule } from './favourites/favourites.module';
import { ReviewsModule } from './reviews/reviews.module';
import { StoreSubscribersModule } from './store_subscribers/store_subscribers.module';

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
      models: [User, Admin, District, Region, Status, Bot, Otp, Address],
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
    TypeModule,
    CategoryModule,
    DiscountsModule,
    SocialMediaTypeModule,
    StoreSocialLinksModule,
    AdsModule,
    FavouritesModule,
    ReviewsModule,
    StoreSubscribersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
