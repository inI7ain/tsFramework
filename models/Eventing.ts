// aliasing for code clarity
type Callback = () => void;

export default class Eventing {

    events: { [key: string]: Callback[] } = {};


    public on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    public trigger(eventName: string): void {
        const handlers = this.events[eventName]

        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach((callback: Callback) => {
            callback();
        })
    }
}