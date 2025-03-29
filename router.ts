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


router.put("/users/:id", async (context) => {
    const userId = context.params.id;
    const updateData = context.request.body;
    
    // Find the index of the user that matches the id
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1 ) {
        context.response.status = 404;
        context.response.body = { error: "User not found" };
        return;
    }
    
    // Merge the existing user data with the update
    users[index] = { ...users[index], ...updateData };
    
    // Return the updated user data
    context.response.status = 200;
    context.response.body = updateData;
})

export default router;