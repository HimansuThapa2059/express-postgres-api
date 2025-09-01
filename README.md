# Express-Postgres-Drizzle API With Docker

> This is a demo app to showcase how Docker is used as a database container and how to bundle and run the entire app using Docker Compose.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally using Docker.

---

### 🧾 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- [Node.js](https://nodejs.org/) (if you're running npm commands outside Docker)

---

### 🛠️ Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/HimansuThapa2059/express-postgres-api.git
cd express-postgres-api
```

#### 2. Rename Environment Files

Rename all `.env.example` files to `.env`:

```bash
mv .env.example .env
```

#### 3. Install Dependencies

You can use either Bun or npm to install the project dependencies.

**Using Bun:**

```bash
bun install
```

**Using npm:**

If you prefer npm, first delete `bun.lockb` if it exists, then run:

```bash
rm bun.lockb
npm install
```

#### 4. Start Docker Desktop

Make sure Docker Desktop is running before proceeding.

#### 5. Start the Database Service

```bash
docker compose up db
```

Leave this terminal running, or open a new one for the next steps.

#### 6. Push the Database Schema

In a **new terminal window**, run the following command to push the database schema:

```bash
DB_HOST=localhost npx drizzle-kit push
```

#### 7. Stop the Database Service

After the schema is pushed, stop the database container:

```bash
docker compose down
```

---

### ▶️ Run the Full Application

Now that the database is set up, run the full application:

```bash
docker compose up
```

The app should now be running and ready to use.

---

## 📫 API Endpoints

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/api/user`     | Create a new user |
| GET    | `/api/user`     | Get all users     |
| GET    | `/api/user/:id` | Get user by ID    |
| PUT    | `/api/user/:id` | Update user by ID |
| DELETE | `/api/user/:id` | Delete user by ID |

---

## 🧼 Stopping the Application

To stop all running containers:

```bash
docker compose down
```

---

## ✨ Happy Coding!

Thanks for checking out this project! Have fun building and experimenting 🚀
