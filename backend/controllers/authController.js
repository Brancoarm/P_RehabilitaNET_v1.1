const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { name, rut, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ rut });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear nuevo usuario (pre-hook manejará la encriptación)
    const newUser = await User.create({ name, rut, email, password });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error en el proceso de registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { rut, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ rut });
    if (!user) {
      console.warn("Usuario no encontrado:", rut);
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Comparar contraseñas utilizando matchPassword
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.warn("Credenciales inválidas para el usuario:", rut);
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user._id,
        name: user.name,
        rut: user.rut,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error en el proceso de inicio de sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
