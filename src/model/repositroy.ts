import moment from 'moment';

import { User } from './user';
import { Bitcoin } from './bitcoin';

class Repository {
  private _users: Array<User> = [];
  private _bitcoin = new Bitcoin();

  public async GetBitcoin (): Promise<Bitcoin> {
    return this._bitcoin;
  }

  public async PutBitcoin (bitcoin: Bitcoin): Promise<Bitcoin> {
    const newValues: Bitcoin = { ...bitcoin };
    newValues.updatedAt = moment().format();
    this._bitcoin = newValues;

    return newValues;
  }

  public async GetUser (id: string): Promise<User> {
    const user: User = this._users.find(item => item.id === id);
    return user;
  }

  public async CreateUser (user: User): Promise<User> {
    this._users.push(user);
    return user;
  }

  public async UpdateUser (user: any, id: string): Promise<User> {
    const updatedUser = this._users.find(item => item.id === id);

    if (updatedUser) {
      updatedUser.name = user.name || updatedUser.name;
      updatedUser.email = user.email || updatedUser.email;
      updatedUser.updatedAt = moment().format();
    }

    return updatedUser;
  }

  public async GetBalance (id: string): Promise<number> {
    const user = this._users.find(item => item.id === id);
    let balance;

    if (user) {
      balance = { balance: user.usdBalance + user.bitcoinAmount * this._bitcoin.price };
    }

    return balance;
  }

  private DepositUsd (id: string, user: User, usdAmount: number): User {
    user.usdBalance += usdAmount;

    return user;
  }

  private WithdrawUsd (id: string, user: User, usdAmount): any {
    if (user.usdBalance < usdAmount) {
      return 'Insufficient funds for the account';
    }

    user.usdBalance -= usdAmount;
    return user;
  }

  public ChangeUsdBalance (id: string, requestBody: any) : any {
    const user = this._users.find(item => item.id === id);

    if (user) {
      const { action, amount } = requestBody;
      return action === 'deposit' ? this.DepositUsd(id, user, amount) : this.WithdrawUsd(id, user, amount);
    }

    return user;
  }

  private BuyBitcoin (id: string, user: User, bitcoinAmount: number): any {
    if (user.usdBalance < bitcoinAmount * this._bitcoin.price) {
      return 'Insufficient funds for the account';
    }

    user.bitcoinAmount += bitcoinAmount;
    user.usdBalance -= bitcoinAmount * this._bitcoin.price;
    return user;
  }

  private SellBitcoin (id: string, user: User, bitcoinAmount): any {
    if (user.bitcoinAmount < bitcoinAmount) {
      return 'Not enough bitcoins in the account';
    }

    user.bitcoinAmount -= bitcoinAmount;
    user.usdBalance += bitcoinAmount * this._bitcoin.price;
    return user;
  }

  public ChangeBitcoinsBalance (id: string, requestBody: any) : any {
    const user = this._users.find(item => item.id === id);

    if (user) {
      const { action, amount } = requestBody;
      return action === 'buy' ? this.BuyBitcoin(id, user, amount) : this.SellBitcoin(id, user, amount);
    }

    return user;
  }
}

global.repository = new Repository();
