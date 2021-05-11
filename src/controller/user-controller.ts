import { Controller, Get, Post, Param, OnUndefined, Body, Put, HttpError } from 'routing-controllers';
import 'reflect-metadata';

import { User } from '../model/user';
import { PutUser, PostUserUsd, PostUserBitcoins } from '../utils/requests';
import { UserNotFoundError } from '../utils/errors';

@Controller()
export class UserController {
  @Get('/users/:id')
  @OnUndefined(UserNotFoundError)
  async getUser (@Param('id') id: string) {
    const user: User = await global.repository.GetUser(id);

    return user;
  }

  @Post('/users')
  async postUser (@Body() info: User) {
    const user = await global.repository.CreateUser(info);

    return user;
  }

  @Put('/users/:id')
  @OnUndefined(UserNotFoundError)
  async putUser (@Param('id') id: string, @Body() info: PutUser) {
    const user = await global.repository.UpdateUser(info, id);

    return user;
  }

  @Get('/users/:id/balance')
  @OnUndefined(UserNotFoundError)
  async getBalance (@Param('id') id: string) {
    const balance = await global.repository.GetBalance(id);

    return balance;
  }

  @Post('/users/:id/usd')
  @OnUndefined(UserNotFoundError)
  async postUserUsd (@Param('id') id: string, @Body() requestBody: PostUserUsd) {
    const response = global.repository.ChangeUsdBalance(id, requestBody);

    if (response === 'Insufficient funds for the account') {
      throw new HttpError(422, response);
    }

    return response;
  }

  @Post('/users/:id/bitcoins')
  @OnUndefined(UserNotFoundError)
  async postUserBitcoins (@Param('id') id: string, @Body() requestBody: PostUserBitcoins) {
    const response = global.repository.ChangeBitcoinsBalance(id, requestBody);

    if (typeof response === 'string') {
      throw new HttpError(422, response);
    }

    return response;
  }
}
