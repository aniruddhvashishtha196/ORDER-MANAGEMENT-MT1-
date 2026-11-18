import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menu = [
  { itemId: 1, itemName: "Veg Burger", price: 120 },
  { itemId: 2, itemName: "Paneer Pizza", price: 350 },
  { itemId: 3, itemName: "French Fries", price: 100 },
  { itemId: 4, itemName: "Veg Biryani", price: 180 }
];

const orders = [];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // A2: Basic routes
  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Welcome to Online Food Order Management!</h1><p>Visit /menu, /about or /home.</p>");
    return;
  }

  if (req.method === "GET" && pathname === "/menu") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(menu, null, 2));
    return;
  }

  if (req.method === "GET" && pathname === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>About Us</h1><p>This application allows customers to view food items and place online food orders.</p>");
    return;
  }

  // A4: Serve HTML with FS module
  if (req.method === "GET" && pathname === "/home") {
    const filePath = path.join(__dirname, "public", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Error: Unable to read the HTML file.");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });
    return;
  }

  // A3: POST /place-order (JSON body)
  if (req.method === "POST" && pathname === "/place-order") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      let order;
      try {
        order = JSON.parse(body);
      } catch {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "Invalid JSON body." }));
        return;
      }

      const required = ["orderId", "customerName", "itemName", "quantity"];
      const missing = required.filter(field => order[field] === undefined || order[field] === null || order[field] === "");
      if (missing.length || !Number.isInteger(Number(order.quantity)) || Number(order.quantity) <= 0) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "Required fields: orderId, customerName, itemName and positive quantity." }));
        return;
      }

      orders.push({
        orderId: Number(order.orderId),
        customerName: String(order.customerName),
        itemName: String(order.itemName),
        quantity: Number(order.quantity)
      });
      res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ message: "Order placed successfully", order: orders.at(-1) }));
    });
    return;
  }

  // A5: Invalid route
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>404 - Route Not Found</h1>");
});

server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});
