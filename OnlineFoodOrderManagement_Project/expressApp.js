import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

let orders = [
  {
    orderId: 1,
    customerName: "Aarav Sharma",
    itemName: "Veg Burger",
    quantity: 2,
    status: "Pending",
    totalAmount: 240
  },
  {
    orderId: 2,
    customerName: "Priya Singh",
    itemName: "Paneer Pizza",
    quantity: 1,
    status: "Preparing",
    totalAmount: 350
  },
  {
    orderId: 3,
    customerName: "Rahul Verma",
    itemName: "French Fries",
    quantity: 3,
    status: "Delivered",
    totalAmount: 300
  }
];

// GET: all orders
app.get("/orders", (req, res) => {
  res.status(200).json(orders);
});

// GET: order by ID
app.get("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.orderId === id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.status(200).json(order);
});

// POST: add order
app.post("/orders", (req, res) => {
  const { orderId, customerName, itemName, quantity, status, totalAmount } = req.body;

  if (
    orderId === undefined || !customerName || !itemName ||
    quantity === undefined || !Number.isInteger(Number(quantity)) ||
    Number(quantity) <= 0 || totalAmount === undefined
  ) {
    return res.status(400).json({
      message: "Please provide orderId, customerName, itemName, positive quantity and totalAmount."
    });
  }

  if (orders.some(o => o.orderId === Number(orderId))) {
    return res.status(400).json({ message: "Order ID already exists." });
  }

  const newOrder = {
    orderId: Number(orderId),
    customerName,
    itemName,
    quantity: Number(quantity),
    status: status || "Pending",
    totalAmount: Number(totalAmount)
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Order placed successfully", order: newOrder });
});

// PUT: update order
app.put("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = orders.findIndex(o => o.orderId === id);
  if (index === -1) return res.status(404).json({ message: "Order not found" });

  const { customerName, itemName, quantity, status, totalAmount } = req.body;
  if (
    (quantity !== undefined && (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0)) ||
    (totalAmount !== undefined && !Number.isFinite(Number(totalAmount)))
  ) {
    return res.status(400).json({ message: "Quantity must be positive and totalAmount must be numeric." });
  }

  orders[index] = {
    ...orders[index],
    ...(customerName !== undefined && { customerName }),
    ...(itemName !== undefined && { itemName }),
    ...(quantity !== undefined && { quantity: Number(quantity) }),
    ...(status !== undefined && { status }),
    ...(totalAmount !== undefined && { totalAmount: Number(totalAmount) })
  };

  res.status(200).json({ message: "Order updated successfully", order: orders[index] });
});

// DELETE: remove order
app.delete("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = orders.findIndex(o => o.orderId === id);
  if (index === -1) return res.status(404).json({ message: "Order not found" });

  const deletedOrder = orders.splice(index, 1)[0];
  res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
});

// Invalid JSON handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON request body." });
  }
  next(err);
});

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
