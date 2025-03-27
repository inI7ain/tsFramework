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

    public retrieve(): void {
        fetch(`https://localhost:8000/users/${this.get("id")}`)
        .then((response: Response): void => {
            console.log(response);
        });
    }
}