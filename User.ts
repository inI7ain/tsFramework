import Eventing from "./models/Eventing.ts";

export interface UserData {
  id?: string;
  name: string;
  age: number;
}

export default class User {

  constructor(private data: UserData) {}

  public events: Eventing = new Eventing();

  public toJSON() {
    return this.data;
  }

  // keyof guarantees that only existing property names are accepted
  public get(propName: keyof UserData): string | number {
    return this.data[propName]!; // non-null assertion added with !
  }

  // Partial allows for updates without redefining the entire object
  public set(update: Partial<UserData>): void {
    Object.assign(this.data, update);
  }
}
