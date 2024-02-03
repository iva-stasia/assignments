interface IBankClient {
  firstName: string;
  lastName: string;
}

class BankClient implements IBankClient {
  private _accounts = new Map<BankAccount["number"], BankAccount>();

  public get accounts(): Map<string, BankAccount> {
    return this._accounts;
  }

  public get age(): number {
    return new Date().getFullYear() - this._bday;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  constructor(
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _bday: number
  ) {}

  public addAccount(account: BankAccount): void {
    this.accounts.set(account.number, account);
  }

  public removeAccount(id: BankAccount["number"]): BankAccount {
    const account = this.accounts.get(id);

    if (!account) throw new Error(`Account doesn't exist`);

    this.accounts.delete(id);
    return account;
  }
}

class BankAccount {
  private readonly iban: string;

  public get holderName(): string {
    return `${this.holder.firstName} ${this.holder.lastName}`;
  }

  public get info(): string {
    return `${this.currency}${this.balance}`;
  }

  public get number(): string {
    return this.iban;
  }

  constructor(private readonly holder: IBankClient, private readonly currency: string, private balance = 0) {
    this.iban = "UA12345678901234";
  }

  public deposit(value: number): void {
    if (value <= 0) throw new Error("Amount cannot be less then 1");

    this.balance += value;
  }

  public withdraw(value: number): void {
    if (value < this.balance) throw new Error("Not enough money on the account for this operation");

    this.balance -= value;
  }
}

class Bank {
  private static instance: Bank;
  private readonly salaryProvider = new SalaryProvider();
  private readonly creditHistoryProvider = new CreditHistoryProvider();
  private readonly policeDBProvider = new PoliceDBProvider();
  private readonly accounts = new Map<BankAccount["number"], BankAccount>();

  private constructor() {}

  public static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }

    return Bank.instance;
  }

  public openAccount(client: BankClient, account: BankAccount): void {
    client.addAccount(account);
    this.addAccount(account);
  }

  public closeAccount(client: BankClient, id: BankAccount["number"]): void {
    client.removeAccount(id);
    this.removeAccount(id);
  }

  private addAccount(account: BankAccount): void {
    this.accounts.set(account.number, account);
  }

  private removeAccount(id: BankAccount["number"]): BankAccount {
    const account = this.accounts.get(id);

    if (!account) throw new Error(`Account doesn't exist`);

    this.accounts.delete(id);
    return account;
  }

  public getAccount(id: BankAccount["number"]): BankAccount {
    const account = this.accounts.get(id);

    if (!account) throw new Error(`Account doesn't exist`);

    return account;
  }

  public deposit(id: BankAccount["number"], amount: number): void {
    const account = this.accounts.get(id);

    if (!account) throw new Error(`Account doesn't exist`);

    account.deposit(amount);
  }

  public withdraw(id: BankAccount["number"], amount: number): void {
    try {
      const account = this.accounts.get(id);

      if (!account) throw new Error(`Account doesn't exist`);

      account.withdraw(amount);
    } catch (error) {
      console.log(error);
    }
  }

  public getCreditDecision(client: BankClient, amount: number, duration: number): boolean {
    const salary = this.salaryProvider.getAnnualSalary(client.firstName, client.lastName, 12);
    const creditRating = this.creditHistoryProvider.getCreditRating(client.accounts);
    const criminalRecord = this.policeDBProvider.isCriminal(client.firstName, client.lastName);

    return true;
  }
}

class SalaryProvider {
  public getAnnualSalary(firstName: string, lastName: string, period: number): number {
    return 1;
  }
}

class CreditHistoryProvider {
  public getCreditRating(accounts: BankClient["accounts"]): number {
    return 1;
  }
}

class PoliceDBProvider {
  public isCriminal(firstName: string, lastName: string): boolean {
    return false;
  }
}
