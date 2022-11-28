require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("./strategies/config");
const db = require("./db/db_init");
let indexFile;

db.then(() => console.log("Connected to database")).catch((err) =>
  console.log(err)
);

//Middleware

app.use(
  session({
    secret: "random",
    cookie: { maxAge: 60000 * 60 * 24 },
    name: "discord.auth",
    saveUninitialized: false,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send('s'); //replace here
})

app.get(
  "/auth",
  passport.authenticate("discord", {
    scope: ["identify", "email", "guilds"],
    prompt: "authorize",
  }),
  function (req, res) {}
);
app.get(
  "/auth/redirect",
  passport.authenticate("discord", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/dashboard");
  } // auth success
);
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
app.get("/dashboard", checkAuth, function (req, res) {
 
  res.json(req.user.username);
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth");
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
