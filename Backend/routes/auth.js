import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";  
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { usuario, contrasena, nombre, apellido, cedula, fechaNacimiento } = req.body;

    const userExistente = await User.findOne({ usuario });
    if (userExistente) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = new User({
      usuario,
      contrasena: hashedPassword,
      nombre,
      apellido,
      cedula,
      fechaNacimiento
    });

    await nuevoUsuario.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    const user = await User.findOne({ usuario });
    if (!user) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const esValida = await bcrypt.compare(contrasena, user.contrasena);
    if (!esValida) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, usuario: user.usuario },
      process.env.JWT_SECRET || "clave_secreta",
      { expiresIn: "1h" }
    );

    res.json({ msg: "Login exitoso", token });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});


export default router;
