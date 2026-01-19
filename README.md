# 🏢 Property Agent API

A RESTful API built with **TypeScript** and **Express** for managing property agents. All data is stored in-memory for development and testing purposes.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Data Model](#data-model)
- [Validation](#validation)
- [Testing](#testing)
- [Project Structure](#project-structure)

---

## ✨ Features

- ✅ Full CRUD operations for Property Agents
- ✅ TypeScript for type safety
- ✅ Input validation with Zod
- ✅ Email uniqueness enforcement
- ✅ Automatic timestamps (createdAt, updatedAt)
- ✅ In-memory data storage
- ✅ RESTful API design

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Validation:** Zod
- **Dev Tools:** Nodemon, ts-node

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd property-management-sample
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development mode**

   ```bash
   npm run dev
   ```

   Server will start at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 📡 API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method      | Endpoint      | Description        |
| ----------- | ------------- | ------------------ |
| `POST`      | `/agents`     | Create a new agent |
| `GET`       | `/agents`     | Get all agents     |
| `GET`       | `/agents/:id` | Get agent by ID    |
| `PUT/PATCH` | `/agents/:id` | Update agent       |
| `DELETE`    | `/agents/:id` | Delete agent       |

---

### 1. Create Agent

**POST** `/agents`

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "+1234567890"
}
```

**Response:** `201 Created`

```json
{
  "id": "abc123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "+1234567890",
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T10:30:00.000Z"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid input data
- `409 Conflict` - Email already exists

---

### 2. Get All Agents

**GET** `/agents`

**Response:** `200 OK`

```json
[
  {
    "id": "abc123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "mobileNumber": "+1234567890",
    "createdAt": "2026-01-19T10:30:00.000Z",
    "updatedAt": "2026-01-19T10:30:00.000Z"
  }
]
```

---

### 3. Get Agent by ID

**GET** `/agents/:id`

**Response:** `200 OK`

```json
{
  "id": "abc123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "+1234567890",
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T10:30:00.000Z"
}
```

**Error Response:**

- `404 Not Found` - Agent doesn't exist

---

### 4. Update Agent

**PUT/PATCH** `/agents/:id`

**Request Body:** (all fields optional for partial update)

```json
{
  "firstName": "Jane",
  "email": "jane.doe@example.com"
}
```

**Response:** `200 OK`

```json
{
  "id": "abc123",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "mobileNumber": "+1234567890",
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T11:45:00.000Z"
}
```

**Error Response:**

- `404 Not Found` - Agent doesn't exist

---

### 5. Delete Agent

**DELETE** `/agents/:id`

**Response:** `200 OK`

```json
{
  "id": "abc123",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "mobileNumber": "+1234567890",
  "createdAt": "2026-01-19T10:30:00.000Z",
  "updatedAt": "2026-01-19T11:45:00.000Z"
}
```

**Error Response:**

- `404 Not Found` - Agent doesn't exist

---

## 📊 Data Model

### PropertyAgent Interface

```typescript
interface PropertyAgent {
  id: string; // Auto-generated unique ID
  firstName: string; // Required, min 1 character
  lastName: string; // Required, min 1 character
  email: string; // Required, must be valid email, unique
  mobileNumber: string; // Required, valid phone format
  createdAt: Date; // Auto-generated on creation
  updatedAt: Date; // Auto-updated on modification
}
```

---

## ✅ Validation

### Input Validation Rules

All requests are validated using **Zod**:

- **firstName**: Required, non-empty string
- **lastName**: Required, non-empty string
- **email**: Required, valid email format, must be unique
- **mobileNumber**: Required, matches phone number pattern

### Validation Errors

**400 Bad Request** - Invalid input

```json
{
  "errors": [
    {
      "code": "invalid_string",
      "message": "Invalid email format",
      "path": ["email"]
    }
  ]
}
```

**409 Conflict** - Duplicate email

```json
{
  "message": "Email already exists"
}
```

---

## 🧪 Testing

### Using Bruno/Postman

1. **Start the server**

   ```bash
   npm run dev
   ```

2. **Test endpoints**
   - Import the Bruno collection from `/docs/bruno-tests.md`
   - Or manually test with Postman/cURL

### Example cURL Commands

**Create Agent:**

```bash
curl -X POST http://localhost:3000/agents \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobileNumber": "+1234567890"
  }'
```

**Get All Agents:**

```bash
curl http://localhost:3000/agents
```

**Get Agent by ID:**

```bash
curl http://localhost:3000/agents/abc123
```

**Update Agent:**

```bash
curl -X PUT http://localhost:3000/agents/abc123 \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Jane"}'
```

**Delete Agent:**

```bash
curl -X DELETE http://localhost:3000/agents/abc123
```

---

## 📁 Project Structure

```
property-management-sample/
├── src/
│   ├── controllers/
│   │   └── agentController.ts    # CRUD logic
│   ├── models/
│   │   └── agent.ts               # Data model & in-memory storage
│   ├── routes/
│   │   └── agent.ts               # Route definitions
│   ├── utils/
│   │   └── generateId.ts          # ID generation utility
│   └── index.ts                   # App entry point
├── dist/                          # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json                  # TypeScript config
├── nodemon.json                   # Nodemon config
└── README.md
```

---

## 📝 Scripts

```json
{
  "dev": "nodemon --watch src --ext ts --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

- **`npm run dev`** - Start development server with auto-reload
- **`npm run build`** - Compile TypeScript to JavaScript
- **`npm start`** - Run production build

---

### Future Enhancements

- 🗄️ Add database integration (PostgreSQL, MongoDB)
- 🔐 Implement authentication & authorization
- 📄 Implement pagination
- 📝 Add logging (Winston, Pino)
- ✅ Add unit and integration tests
- 🐳 Dockerize the application

---

## 📄 License

This project is licensed under the MIT License.
