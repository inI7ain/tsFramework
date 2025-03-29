interface UserData {
  id?: string;
  name: string;
  age: number;
}

// aliasing for code clarity
type Callback = () => void;

export default class User {
  events: { [key: string]: Callback[] } = {};
  constructor(private data: UserData) {}

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

  public on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  public async retrieve(): Promise<void> {
    const res = await fetch(`http://localhost:3000/users/${this.get("id")}`);
    const data = await res.json();
    this.set(data);    
  }

  public async save(): Promise<void> {
    const id = this.get("id");
    
    if (this.get("id")) {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data),
      });
    } else {
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data)
      });
    }
  }
}
