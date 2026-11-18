# Online Food Order Management Web Application

This project follows the MT1 Node.js Lab Examination requirements.

## Technologies
- Node.js ES Modules
- Built-in `http` and `fs` modules (Part A)
- Express.js REST API (Part B)
- JavaScript arrays (no database)

## Setup
Open a terminal in this project directory:

```bash
npm install
```

## Run Part A (HTTP Server)
```bash
npm run start:http
```
Open:
- http://localhost:3000/
- http://localhost:3000/menu
- http://localhost:3000/about
- http://localhost:3000/home

POST `http://localhost:3000/place-order` with JSON:
```json
{
  "orderId": 10,
  "customerName": "Neha Verma",
  "itemName": "Paneer Pizza",
  "quantity": 1
}
```

## Run Part B (Express REST API)
Open another terminal:
```bash
npm run start:express
```

Endpoints:
| Method | URL | Purpose |
|---|---|---|
| GET | http://localhost:4000/orders | List all orders |
| GET | http://localhost:4000/orders/1 | Get order by ID |
| POST | http://localhost:4000/orders | Create an order |
| PUT | http://localhost:4000/orders/1 | Update an order |
| DELETE | http://localhost:4000/orders/1 | Delete an order |

### Example POST body
```json
{
  "orderId": 4,
  "customerName": "Neha Verma",
  "itemName": "Paneer Pizza",
  "quantity": 1,
  "status": "Pending",
  "totalAmount": 350
}
```

### Example PUT body
```json
{
  "customerName": "Aarav Sharma",
  "itemName": "Veg Burger",
  "quantity": 3,
  "status": "Preparing",
  "totalAmount": 360
}
```

## Screenshots
Save your screenshots of both servers and EchoAPI tests in the `screenshots/` folder before submission.

## GitHub
Create a repository named `MT1-LABEXAM`, then:
```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
