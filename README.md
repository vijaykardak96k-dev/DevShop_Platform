# DevShop Platform

A simple, microservices-ready mini e-commerce application. This repo contains **application code only**
(no Docker, Kubernetes, CI/CD, or other infrastructure — that's handled separately).

## Project Structure

```
devshop-platform/
  backend/
    product-service/   # GET /products, GET /products/:id, POST /products
    order-service/      # POST /orders, GET /orders (validates products via product-service)
    user-service/       # POST /register, POST /login (basic auth, no JWT)
  frontend/             # React app: product listing, details, cart, login/register
```

Each backend service is a fully independent Express app with its own `package.json`, and follows the
same internal layout:

```
service-name/
  src/
    server.js          # app entrypoint, wires everything together
    config/             # environment-based configuration
    routes/              # route definitions
    controllers/        # request/response handling
    services/            # business logic
    data/                 # in-memory data store (swap for PostgreSQL later)
    middleware/          # error handling
```

## Data Storage

Each service uses a **simple in-memory data store** (plain JS arrays/objects) rather than PostgreSQL.
This keeps local setup dependency-free (no DB install/config needed) while still isolating data access
behind a `data/store.js` module per service — swapping in real PostgreSQL later only requires rewriting
that one file per service, not the controllers or routes.

Note: because data is in-memory, it resets whenever a service restarts.

## Prerequisites

- Node.js 18+ and npm

## Running the Backend Services

Each service runs independently on its own port. Open three terminals (or run them in the background).

### 1. Product Service (port 4001)

```bash
cd backend/product-service
cp .env.example .env
npm install
npm start
```

### 2. Order Service (port 4002)

```bash
cd backend/order-service
cp .env.example .env
npm install
npm start
```

> Order service calls product-service (via `PRODUCT_SERVICE_URL` in `.env`) to validate that ordered
> product IDs exist, so start product-service first.

### 3. User Service (port 4003)

```bash
cd backend/user-service
cp .env.example .env
npm install
npm start
```

### Health Checks

Every service exposes `GET /health`:

```bash
curl http://localhost:4001/health
curl http://localhost:4002/health
curl http://localhost:4003/health
```

## Running the Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

This starts the React dev server at `http://localhost:3000` and talks to the three backend services
using the URLs defined in `.env`.

## API Reference & Example curl Commands

### Product Service — `http://localhost:4001`

```bash
# List all products
curl http://localhost:4001/products

# Get a single product
curl http://localhost:4001/products/1

# Create a product
curl -X POST http://localhost:4001/products \
  -H "Content-Type: application/json" \
  -d '{"name": "USB-C Hub", "price": 29.99, "description": "6-in-1 USB-C hub"}'
```

### Order Service — `http://localhost:4002`

```bash
# Create an order
curl -X POST http://localhost:4002/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName": "Jane Doe", "items": [{"productId": 1, "quantity": 2}]}'

# List all orders
curl http://localhost:4002/orders
```

### User Service — `http://localhost:4003`

```bash
# Register
curl -X POST http://localhost:4003/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com", "password": "secret123"}'

# Login
curl -X POST http://localhost:4003/login \
  -H "Content-Type: application/json" \
  -d '{"email": "jane@example.com", "password": "secret123"}'
```

## Notes for the DevOps Engineer

- Each backend service is stateless-code-wise and reads its port/config from environment variables
  (see each service's `.env.example`).
- No infrastructure, container, or pipeline config is included by design — this repo is meant to be
  containerized, orchestrated, and deployed separately.
- Swap `data/store.js` in each service for a real PostgreSQL-backed module when wiring up persistence;
  controllers/routes/services do not need to change since they only depend on that module's exported
  function signatures.
