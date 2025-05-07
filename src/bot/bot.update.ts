import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";
@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    // const name = ctx.from?.first_name || "foydalanuvchi";

    // Tarjimai hol

    return this.botService.start(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx)
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context){
    return this.botService.onStop(ctx)
  }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("video" in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.reply(String(ctx.message.video.file_size));
  //     await ctx.replyWithVideo(ctx.message.video.file_id);
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("sticker" in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //     await ctx.replyWithSticker(ctx.message.sticker.file_id);
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithSticker(ctx.message.animation.file_id);
  //   }
  // }

  // @On("document")
  // async onDoc(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("document" in ctx.message!) {
  //     console.log(ctx.message.document);
  //     await ctx.replyWithSticker(ctx.message.document.file_name!);
  //   }
  // }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("contact" in ctx.message!) {
  //     console.log(ctx.message.contact);
  //     await ctx.replyWithSticker(ctx.message.contact.phone_number);
  //     await ctx.replyWithSticker(ctx.message.contact.first_name);
  //   }
  // }

  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("location" in ctx.message!) {
  //     console.log(ctx.message.location);
  //     await ctx.replyWithSticker(String(ctx.message.location.latitude));
  //     await ctx.replyWithSticker(String(ctx.message.location.longitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.longitude
  //     );
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.replyWithVoice(ctx.message.voice.file_id);
  //   }
  // }

  // @Hears("hi")
  // async onHearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply("Hey, how can help you?");
  // }

  // @Command("help")
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.reply("Ok, what kinda help?");
  // }

  // @Command("inline")
  // async onCommandInline(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: "Button-1",
  //         callback_data: "button_1",
  //       },
  //       {
  //         text: "Button-2",
  //         callback_data: "button_2",
  //       },
  //       {
  //         text: "Button-3",
  //         callback_data: "button_3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button-4",
  //         callback_data: "button_4",
  //       },
  //       {
  //         text: "Button-5",
  //         callback_data: "button_5",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button-6",
  //         callback_data: "button_6",
  //       },
  //     ],
  //   ];
  //   await ctx.reply("Kerakli tugmani tanlang:", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action("button_1")
  // async onActionButton1(@Ctx() ctx: Context) {
  //   await ctx.reply("Button1 bosildi!");
  // }

  // @Action("button_2")
  // async onActionButton2(@Ctx() ctx: Context) {
  //   await ctx.reply("Button2 bosildi!");
  // }

  // @Action(/^button_\d+$/)
  // async onActionAnyButton(@Ctx() ctx: Context) {
  //   if ("data" in ctx.callbackQuery!) {
  //     const buttonData = ctx.callbackQuery?.data;
  //     const id = buttonData.split("_")[1];
  //     await ctx.reply(`${id} Button bosildi`);
  //   }
  // }

  // @Command("main")
  // async onCommandMain(@Ctx() ctx: Context) {
  //   const mainKeyboard = [
  //       ["bir", "ikki", "uch"],
  //       ["to'rt", "besh"],
  //       ["olti"],
  //       [Markup.button.contactRequest("Telefo'n raqamingizni yuboring")],
  //       [Markup.button.locationRequest("Locatsiyangizni raqamingizni yuboring")]
  //   ];
  //   await ctx.reply("Kerakli main tugmani tanlang:", {
  //     ...Markup.keyboard(mainKeyboard).resize()
  //   });
  // }
  // @Hears("bir")
  // async onHearsButtonBir(@Ctx() ctx: Context) {
  //   await ctx.reply("Main button bir bosildi");
  // }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    return this.botService.onText(ctx)
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat!.id);
    console.log(ctx.from);
    console.log(ctx.from!.id);
  }
}
