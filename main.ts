import User from "./User.ts";

const user = new User({ id: "b579"});

await user.retrieve();
console.log(user);
