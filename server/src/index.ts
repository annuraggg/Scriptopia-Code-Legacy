// imports for server
import app from "./config/init.js";

// imports for APIS
import auth from "./api/auth/main.js";
import problems from "./api/problems/main.js";
import compiler from "./api/compiler/main.js";
import settings from "./api/settings/main.js";

app.use("/auth", auth);
app.use("/problems", problems);
app.use("/compiler", compiler);
app.use("/settings", settings);

app.get("/version", (req, res) => {
  res.json({ version: "0.1.2" });
});

app.listen(3000);
