# Winston-Telegram

[![NPM](https://nodei.co/npm/winston-telegram.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@wildegor/winston-telegram/)

A [Telegram][0] transport for [winston][1].
Originally forked from [ivanmarban/winston-telegram][5] and updated to support winston 3.x and some features

[![Version npm](https://img.shields.io/npm/v/winston-telegram.svg)](https://www.npmjs.com/package/@wildegor/winston-telegram)
[![npm Downloads](https://img.shields.io/npm/dw/winston-telegram.svg)](https://npmcharts.com/compare/@wildegor/winston-telegram?minimal=true)
[![Tests Status](https://github.com/ivanmarban/winston-telegram/actions/workflows/tests.yml/badge.svg?branch=master)](https://github.com/wildegor/winston-telegram/actions/workflows/testing.yml)
[![Coverage Status](https://coveralls.io/repos/github/ivanmarban/winston-telegram/badge.svg?branch=master)](https://coveralls.io/github/wildegor/winston-telegram?branch=main)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## winston-telegram

Installation:
``` sh
$ yarn add winston@3
$yarn add @wildegor/winston-telegram@latest
```

## Usage
``` js
const logger = require('winston')
const TelegramTransport = require('@wildegor/winston-telegram')

// or
import TelegramLogger from '@wildegor/winston-telegram';

logger.add(new TelegramTransport(options))
```

Options:

* __token:__ The Telegram bot authentication token. *[required]*
* __chatId:__ The Telegram chatid you want to send to. *[required]*
* __parseMode:__ The Telegram mode for parsing entities in the message text. See [formatting options][4] for more details. *[optional]*
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

Follow below steps to run the examples:

``` sh
$ git clone git@github.com:wildegor/winston-telegram.git -b main --single-branch
$ yarn install
```

Replace `TELEGRAM_TOKEN` and `CHAT_ID` with appropriate values, then run whatever example you want:

``` sh
$ cd examples/simple-log
$ yarn install
$ yarn start
```

[0]: https://telegram.org/
[1]: https://github.com/flatiron/winston
[2]: https://github.com/wildegor/winston-telegram/tree/1.x
[3]: https://github.com/wildegor/winston-telegram/tree/main/examples
[4]: https://core.telegram.org/bots/api#formatting-options
[5]: https://github.com/ivanmarban/winston-telegram
