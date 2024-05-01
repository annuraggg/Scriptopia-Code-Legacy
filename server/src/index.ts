// imports for server
import app, {io, server} from "./config/init.js";

// imports for APIS
import auth from "./api/auth/main.js";
import problems from "./api/problems/main.js";
import compiler from "./api/compiler/main.js";
import settings from "./api/settings/main.js";
import submission from "./api/submission/main.js";
import home from "./api/home/main.js"
import profile from "./api/profile/main.js"
import screening from "./api/screenings/main.js"
import apis from "./api/data/main.js"
import organization from "./api/organization/main.js"
import redirects from "./api/redirects/main.js"

app.use("/auth", auth);
app.use("/problems", problems);
app.use("/compiler", compiler);
app.use("/settings", settings);
app.use("/home", home)
app.use("/submission", submission)
app.use("/profile", profile)
app.use("/screenings", screening)
app.use("/api", apis)
app.use("/organization", organization)
app.use("/redirects", redirects)

app.get("/version", (_req, res) => {
  res.json({ version: "0.1.61" });
});

app.listen(3000);
server.listen(3001);
