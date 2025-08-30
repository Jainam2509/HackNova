import User from "../models/User.js";

export const seedAdmin = async (req, res, next) => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (email === "admin@example.com" && password === "Admin@123") {
      const user = await User.findOne({
        name: "Admin",
        email,
        password,
        role: "admin",
      });
      res.json({ ok: true, id: user._id });
    } else {
      const create = await User.create({ email });
      if (!create)
        return res.json({ ok: true, message: "Admin already exists" });
      const user = await User.create({
        name: "Admin",
        email,
        password,
        role: "admin",
      });
      res.json({ ok: true, id: user._id });
    }
  } catch (e) {
    next(e);
  }
};
