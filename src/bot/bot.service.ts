import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./model/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constans";
import { Context, Markup, Telegraf } from "telegraf";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      if (!user_id) throw new BadRequestException("User id not found");
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        const newUser = await this.botModel.create({
          userId: user_id,
          username: ctx.from?.username!,
          first_name: ctx.from?.first_name,
          last_name: ctx.from?.last_name!,
          lang: ctx.from?.language_code!,
        });
        await ctx.replyWithHTML(
          `Iltimos , <b>Telefon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefon raqamni yuborish")],
            ])
              .oneTime()
              .resize(),
          }
        );
      } else if (!user.status || !user.phone_number) {
        await ctx.replyWithHTML(
          `Iltimos , <b>Telefon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefon raqamni yuborish")],
            ])
              .oneTime()
              .resize(),
          }
        );
      } else {
        const bioText = `
      👨‍💻 **Bot haqida**:
      Men, sizga har qanday yordam bera olishim uchun yaratilgan botman.
      Foydalanuvchilarga turli xil imkoniyatlar taqdim etaman:
      - Foto, video, animatsiya yuborish.
      - Matnni ovozga aylantirish.
      - Lokatsiya va aloqa ma'lumotlarini yuborish.
      - Tugmalar bilan interaktiv foydalanuvchi tajribasi.

      🤖 Yordam kerak bo'lsa, men bilan bog'laning!:
      (https://t.me/Filocalistme)
    `;

        await ctx.replyWithHTML(
          `Assalomu aleykum, ${user.first_name}! 👋\n\n${bioText}`,
          {
            ...Markup.removeKeyboard(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on start=>${error}`);
      //   throw new BadRequestException(error);
    }
  }
  async onContact(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos , <b>start</b> tugmasini bosing`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(),
        });
      } else if (user.phone_number) {
        await ctx.replyWithHTML("Siz avval ro'yxatdan o'tgansiz", {
          ...Markup.removeKeyboard(),
        });
      } else if (
        "contact" in ctx.message! &&
        ctx.message?.contact.user_id != user_id
      ) {
        await ctx.reply(
          `Iltimos, o'zinggizni telefo'n raqaminggizni yuboring`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefo'n raqamni yuborish")],
            ])
              .oneTime()
              .resize(),
          }
        );
      } else if ("contact" in ctx.message!) {
        let phone = ctx.message.contact.phone_number;
        if (phone[0] != "+") {
          phone = "+" + phone;
        }
        user.phone_number = phone;
        user.status = true;
        await user.save();
        await ctx.reply("Telefon raqamingiz muvaffaqiyatli saqlandi ✅", {
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log(`Error on Contact: ${error}`);
      throw new BadRequestException(error);
    }
  }

  async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos , <b>start</b> tugmasini bosing`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(),
        });
      } else if (user.status) {
        user.status = false;
        user.phone_number = "";
        await user.save();
        await ctx.replyWithHTML(
          `Siz vaqtincha botdan chiqdingiz. Qayta faollashtirish uchun <b>/start</b> tugmasini bosing.`,
          {
            ...Markup.keyboard([["/start"]])
              .oneTime()
              .resize(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on stop:`, error);
    }
  }

  async sendOtp(phone_number: string, OTP: string) {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });

      if (!user || !user.status) {
        return false;
      }

      await this.bot.telegram.sendMessage(user.userId, `Verify code: ${OTP}`);
      return true;
    } catch (error) {
      console.log(`Error on sending OTP:`, error);
    }
  }

  async onText(ctx: Context) {
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
    } catch (error) {
      console.log(`Error on text`, error);
    }
  }
}
