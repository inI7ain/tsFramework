import User from "./User.ts";

const user = new User({ name: "new record", age: 0 });
const fUser = new User({ id: "b579" });
await fUser.retrieve();
fUser.set({ age: 29 });
fUser.save();


