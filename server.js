const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require('koa-cors');
const HttpStatus = require("http-status");

const app = new Koa();

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/runnel_frontend/build")); //serve the build directory
app.use(mount("/", static_pages));
const PORT = process.env.PORT || 3000;

app.use(BodyParser());
app.use(Logger());
app.use(cors());

const router = new Router();

router.get("/runnel",async (ctx,next)=>{
  const runnels = ["Runnel", "Pay Pal", "Venmo"];
  ctx.status = HttpStatus.OK;
  ctx.body = runnels;
  await next();
});

app.use(router.routes()).use(router.allowedMethods());


app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});