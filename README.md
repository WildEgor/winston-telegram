# Winston-Telegram

[![NPM](https://nodei.co/npm/winston-telegram.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@wildegor/winston-telegram/)

A [Telegram][0] transport for [winston][1].

Originally forked from [ivanmarban/winston-telegram][2] and updated to support winston 3.x and new features.

[![Version npm](https://img.shields.io/npm/v/@wildegor/winston-telegram.svg)](https://www.npmjs.com/package/@wildegor/winston-telegram)
[![npm Downloads](https://img.shields.io/npm/dw/@wildegor/winston-telegram.svg)](https://npmcharts.com/compare/@wildegor/winston-telegram?minimal=true)
[![Tests Status](https://github.com/wildegor/winston-telegram/actions/workflows/testing.yml/badge.svg?branch=main)](https://github.com/wildegor/winston-telegram/actions/workflows/testing.yml)
[![Coverage Status](https://coveralls.io/repos/github/wildegor/winston-telegram/badge.svg?branch=main)](https://coveralls.io/github/wildegor/winston-telegram?branch=main)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Main features:
- [x] Send log message to Telegram;
- [x] Send log messages with batching delay;
- [x] Send log messages with custom template;
- [x] Send log messages with custom formatMessage function;
- [x] Send log messages to specific chat;
- [x] Send log messages to specific topic;
- [x] Send log messages with silent mode;
- [x] Send log messages with disable notification;
- [x] Send log messages with custom parse mode;
- [x] Send log messages with custom levels;
- [x] Send log messages with handle exceptions;
- [x] Send log messages with custom batching separator.

## Installation:
``` sh
$ yarn add winston@3
$ yarn add winston-transport@4
$ yarn add axios
$ yarn add @wildegor/winston-telegram@latest
```

## Usage
``` js
const logger = require('winston')
const TelegramTransport = require('@wildegor/winston-telegram')

// or
import { TelegramTransport } from '@wildegor/winston-telegram';

logger.add(new TelegramTransport(options))
```

Options:

* __token:__ The Telegram bot authentication token. *[required]*
* __chatId:__ The Telegram chatid you want to send to. *[optional]*
* __parseMode:__ The Telegram mode for parsing entities in the message text. See [formatting options][3] for more details. *[optional]*
* __levels:__ Levels of messages that this transport should log. *[optional]* *[default ALL]*
* __silent:__ Whether to suppress output. *[boolean]* *[optional]*
* __disableNotification:__ Sends the message silently. *[boolean]* *[optional]*
* __template:__ Format output message. *[string]* *[optional]*
* __formatMessage:__ Format output message by own method. *[function]* *[optional]*
* __handleExceptions:__ Handle uncaught exceptions. *[boolean]* *[optional]*
* __batchingDelay:__ Time in ms within which to batch messages together. *[integer]* *[optional]* *[default 0 or disabled]*
* __batchingSeparator:__ String with which to join batched messages with *[string]* *[default "\n\n"]*

String template is based on named arguments:
``` js
'{level}' -> level of messages
'{message}' -> text of messages
'{metadata}' -> metadata object of messages
```

## Examples

Follow below steps to run the [examples][4]:

``` sh
$ git clone git@github.com:wildegor/winston-telegram.git -b main --single-branch
$ yarn install
```

Replace `TELEGRAM_TOKEN` and `CHAT_ID` with appropriate values, then run whatever example you want:

``` sh
$ cd examples/simple-log # or examples/replace-nest-logger
$ yarn install
$ yarn start:dev
```

[0]: https://telegram.org/
[1]: https://github.com/flatiron/winston
[2]: https://github.com/ivanmarban/winston-telegram
[3]: https://core.telegram.org/bots/api#formatting-options
[4]: https://github.com/wildegor/winston-telegram/tree/main/examples
