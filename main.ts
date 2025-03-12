import User from "./models/User.ts";

Deno.serve((_req) => {
  const user = new User({name: "Ati", age: 30});
  user.set({age: 31});

  user.on("change", () => {});
  user.on("random", () => {});
  user.on("random", () => {});

  return new Response(JSON.stringify(
    user
  ),
  {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
});

