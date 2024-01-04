import { Module } from '@nestjs/common';
import { LogLevels, TelegramTransport } from '@wildegor/winston-telegram';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new TelegramTransport({
          token: '6581515204:AAFECpWwl7XsNpehc0dbgWZxtg0QcVajTTg',
          chatId: '-1002035814378',
          levels: [LogLevels.Info],
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
