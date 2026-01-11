const usersService = require('../service/users.service');

exports.getUsers = async (req, res) => {
  try {
    const users = await usersService.getUsers(req.query);
    return res.status(200).json(users);
  } catch (err) {
    console.log("Failed to getUsers", err)
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.log("Failed to getUserById:", err)
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await usersService.createUser(req.body);
    return res.status(201).json(user);
  } catch (err) {
    console.error('Failed to createUser:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updated = await usersService.updateUser(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated' });
  } catch (err) {
    console.log("Failed to updateUser:",err)
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.upsertProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await usersService.upsertProfile(userId, req.body);

    return res.status(200).json({ message: 'Profile saved' });
  } catch (err) {
    console.log("Failed to upsertProfile:",err)
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deleted = await usersService.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.log("Failed to deleteUser:",err)
    res.status(500).json({ error: 'Internal server error' });
  }
};
