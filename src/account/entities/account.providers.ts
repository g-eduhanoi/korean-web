import { Account } from "./account.entity";

export const AccountProviders = [
    {
      provide: 'ACCOUNT_REPO',
      useValue: Account,
    },
  ];