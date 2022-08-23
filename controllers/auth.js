import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registr user
export const registr = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({ message: "Данное имя пользователя занято" });
    }

    // шифруем пароль
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      'asad2313h13bj1h3b1j3b1jh3b13',
      { expiresIn: "30d" }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      message: "Регистрация прошла успешно",
    });
  } catch (error) {
    res.json({ message: "Ошибка при регистрации пользователя" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "Такого пользователя не существует" });
    }

    // сравниваем пароли при автоизации
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ message: "Неверный пароль" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      // process.env.JWT_SECRET,
      'asad2313h13bj1h3b1j3b1jh3b13',
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
      message: "Вы вошли в систему",
    });
  } catch (error) {
    res.json({ message: "Ошибка при авторизации" });
  }
};

// Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ message: "Такого пользователя не существует" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      'asad2313h13bj1h3b1j3b1jh3b13',
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ message: "Нет доступа" });
  }
};
