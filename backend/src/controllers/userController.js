import { User } from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePreferences = async (req, res) => {
  try {
    const { alertThreshold, darkMode } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          'preferences.alertThreshold': alertThreshold,
          'preferences.darkMode': darkMode
        }
      },
      { new: true }
    )
      .select('-password')
      .lean();

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
