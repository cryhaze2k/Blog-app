const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
router.get("/reset-password", (req, res) => res.render("reset-password"));

router.post("/register", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash
    });

    res.redirect("/login");
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.send("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.send("Wrong password");

    req.session.user = user;
    res.redirect("/posts");
});

router.post("/reset-password", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.send("User not found");

    const hash = await bcrypt.hash("123456", 10);
    user.password = hash;
    await user.save();

    res.send("Password reset to: 123456");
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;