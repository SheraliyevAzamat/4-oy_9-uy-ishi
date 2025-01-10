// Register User
exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const user = { id: req.db.users.length + 1, name, email, password };
  req.db.users.push(user);
  res.status(201).json(user);
};

// Login User
exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = req.db.users.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

// Get All Users
exports.getAllUsers = (req, res) => {
  res.json(req.db.users);
};

// Get User by ID
exports.getUserById = (req, res) => {
  const user = req.db.users.find((u) => u.id === parseInt(req.params.userId));
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
};

// Update User
exports.updateUser = (req, res) => {
  const user = req.db.users.find((u) => u.id === parseInt(req.params.userId));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

// Delete User
exports.deleteUser = (req, res) => {
  const userIndex = req.db.users.findIndex(
    (u) => u.id === parseInt(req.params.userId)
  );
  if (userIndex > -1) {
    req.db.users.splice(userIndex, 1);
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
