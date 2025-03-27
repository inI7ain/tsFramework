import { Router } from 'https://deno.land/x/oak/mod.ts'

const router = new Router();

router.use("/favicon.ico", () => {
    return new Response(null, { status: 204 });
})


router.get("/users/:id", async (context) => {
    const userId = context.params.id;
    context.response.body = { userId, message: "User data extracted successfully."} 
});

export default router;