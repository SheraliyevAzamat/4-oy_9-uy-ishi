// Get All Products
exports.getAllProducts = (req, res) => {
  res.json(req.db.products);
};

// Get Product by ID
exports.getProductById = (req, res) => {
  const product = req.db.products.find(
    (p) => p.id === parseInt(req.params.productId)
  );
  if (product) res.json(product);
  else res.status(404).json({ error: "Product not found" });
};

// Create Product
exports.createProduct = (req, res) => {
  const product = { id: req.db.products.length + 1, ...req.body };
  req.db.products.push(product);
  res.status(201).json(product);
};

// Update Product
exports.updateProduct = (req, res) => {
  const product = req.db.products.find(
    (p) => p.id === parseInt(req.params.productId)
  );
  if (product) {
    Object.assign(product, req.body);
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

// Delete Product
exports.deleteProduct = (req, res) => {
  const productIndex = req.db.products.findIndex(
    (p) => p.id === parseInt(req.params.productId)
  );
  if (productIndex > -1) {
    req.db.products.splice(productIndex, 1);
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};
