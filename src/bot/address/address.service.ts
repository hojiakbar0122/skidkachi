import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "../model/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../../app.constans";
import { Context, Markup, Telegraf } from "telegraf";
import { Address } from "../model/address.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onAddress(ctx: Context) {
    try {
      await ctx.replyWithHTML("Manzil bo'yicha kerakli tugmani bosing", {
        ...Markup.keyboard([["Mening manzillarim", "Yangi manzil qo'shish"]])
      })
    } catch (error) {
      console.log(`Error on address:`, error);
    }
  }

  async onNewAddress(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos , <b>start</b> tugmasini bosing`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(),
        });
      }
      await this.addressModel.create({userId:user_id!, last_state:"name"})
      await ctx.replyWithHTML("Yangi manzil nomini kiriting:", {
        ...Markup.removeKeyboard()
      })
    } catch (error) {
      console.log(`Error on address:`, error);
    }
  }
}
