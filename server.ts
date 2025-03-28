import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

// https
/* const cert = await Deno.readTextFile("./certificates/cert.pem");
const key = await Deno.readTextFile("./certificates/key.pem");

if (!cert || !key) {
  throw new Error("Certificate file or key file not specified.");
} else {

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  await app.listen({
    port: 8000,
    secure: true,
    cert,
    key
  });

}

*/

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });