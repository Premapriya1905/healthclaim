# HealthClaim

A full-stack Health Insurance Claim Management application featuring real-time processing, smart analytics, and a secure, fast user experience.

---

## Tech Stack

### Frontend
- **React** (with Vite)
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Recharts** (charts/analytics)

### Backend
- **Node.js**
- **Express.js**
- **Mongoose** (MongoDB ODM)
- **MongoDB** (database)
- **dotenv** (environment variables)
- **cors** (CORS middleware)
- **nodemon** (dev server)

---

## Features
- Real-time claim processing
- Smart analytics dashboard
- Secure and fast claim submission
- Responsive, modern UI

---

## Project Structure

```
HealthClaim/
  backend/        # Node.js/Express API
  healthclaim/    # React frontend (Vite)
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
# Create a .env file with MONGODB_URI
npm start
```

### Frontend Setup
```bash
cd healthclaim
npm install
npm run dev
```

---

## API Overview

### Base URL
`http://localhost:5000/api/v1/claims`

### Endpoints
- `GET /` - Health check
- `GET /api/v1/claims` - List all claims
- `POST /api/v1/claims` - Create a new claim

#### Claim Model
```json
{
  "policyNumber": "string",
  "claimantName": "string",
  "amount": number,
  "dateOfClaim": "date"
}
```

---

## Environment Variables
Create a `.env` file in `backend/`:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

---

## License
MIT

---

## Author
- [Your Name]

---

## Screenshots
_Add screenshots of the UI here_

---

## Acknowledgements
- React, Vite, Tailwind CSS, Express, MongoDB, and all open-source contributors. 