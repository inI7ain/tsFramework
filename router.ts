import { Router } from 'https://deno.land/x/oak/mod.ts'
import db from "./db.json" with { type: "json" };

const users = db.users;
const router = new Router();

router.use("/favicon.ico", () => {
    return new Response(null, { status: 204 });
})


router.get("/users/:id", async (context) => {
    const userId = context.params.id;
    const user = users.find((u) => u.id === userId);

  if (user) {
    context.response.body = user;
    
  } else {
    context.response.status = 404;
    context.response.body = { error: "User not found" };
  }

});

export default router;