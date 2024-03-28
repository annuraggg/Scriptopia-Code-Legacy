// imports for server
import app from "./config/init.js";

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

app.use("/auth", auth);
app.use("/problems", problems);
app.use("/compiler", compiler);
app.use("/settings", settings);
app.use("/home", home)
app.use("/submission", submission)
app.use("/profile", profile)
app.use("/screenings", screening)
app.use("/api", apis)

app.get("/version", (req, res) => {
  res.json({ version: "0.1.4" });
});

app.listen(3000);
