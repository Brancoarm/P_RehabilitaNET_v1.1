const User = require('../models/User');

// Obtener perfil del usuario
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar perfil del usuario
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
