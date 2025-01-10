// Get All Orders
exports.getAllOrders = (req, res) => {
  res.json(req.db.orders);
};

// Get Order by ID
exports.getOrderById = (req, res) => {
  const order = req.db.orders.find(
    (o) => o.id === parseInt(req.params.orderId)
  );
  if (order) res.json(order);
  else res.status(404).json({ error: "Order not found" });
};

// Create Order
exports.createOrder = (req, res) => {
  const order = { id: req.db.orders.length + 1, ...req.body };
  req.db.orders.push(order);
  res.status(201).json(order);
};

// Update Order
exports.updateOrder = (req, res) => {
  const order = req.db.orders.find(
    (o) => o.id === parseInt(req.params.orderId)
  );
  if (order) {
    Object.assign(order, req.body);
    res.json(order);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
};

// Delete Order
exports.deleteOrder = (req, res) => {
  const orderIndex = req.db.orders.findIndex(
    (o) => o.id === parseInt(req.params.orderId)
  );
  if (orderIndex > -1) {
    req.db.orders.splice(orderIndex, 1);
    res.json({ message: "Order deleted" });
  } else {
    res.status(404).json({ error: "Order not found" });
  }
};
