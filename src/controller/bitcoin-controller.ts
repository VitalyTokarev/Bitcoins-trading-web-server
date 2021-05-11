import { Controller, Get, Put, Body } from 'routing-controllers';
import 'reflect-metadata';

import { Bitcoin } from '../model/bitcoin';

@Controller()
export class BitcoinController {
  @Get('/bitcoin')
  async getOne () {
    const bitcoin: Bitcoin = await global.repository.GetBitcoin();

    return bitcoin;
  }

  @Put('/bitcoin')
  async postOne (@Body() info: Bitcoin) {
    const bitcoin = await global.repository.PutBitcoin(info);

    return bitcoin;
  }
}
