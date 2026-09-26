# Piyush Aquatic – Smart Ornamental Fish Farm Management and Wholesale E-Commerce System

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> Semester 6 full implementation of the project **“IT Support for Self-Help Groups and Micro-Entrepreneurs”** for **Piyush Aquatic**, an ornamental fish farming and wholesale business.

---

## 📌 Overview

Piyush Aquatic is a micro-entrepreneurial ornamental fish farming organization based in Dabhil, Taluka Khed, District Ratnagiri, Maharashtra. The organization manages approximately **200 glass and fiberglass tanks** and works with species such as **Discus, Angelfish, Arowana, Guppy, Ram Cichlid, and Plecostomus**.

This project provides a complete digital platform to manage:

- Fish inventory
- Breeding pairs and breeding records
- Young fish / fry rearing
- Tank information
- Water quality parameters
- Feeding and health records
- Maintenance activities
- Wholesale customers and orders
- Reports and analytics

The system is designed as a production-grade full-stack application using **Java Spring Boot**, **React**, **PostgreSQL**, **JWT authentication**, **Docker**, and **CI/CD**.

---

## ✨ Features

### 🐟 Fish Inventory Management
- Species management
- Available quantity
- Male / female count
- Age and size
- Price
- Batch / lot tracking
- QR code generation for tanks or batches

### 🧬 Breeding Management
- Breeding pairs
- Breeding dates
- Spawning observations
- Egg / fry information
- Rearing records
- Genetic lineage tracking
- Breeding success analytics

### 🏊 Tank Management
- Tank number and capacity
- Fish assigned to tank
- Tank status
- Maintenance schedule
- Maintenance history

### 💧 Water Quality & Health
- Temperature
- pH
- Ammonia
- Nitrite
- Nitrate
- Dissolved oxygen
- Health observations
- Treatment logs
- Automated alerts for out-of-range values

### 🍽️ Feeding & Maintenance
- Feeding schedules
- Feeding records
- Tank cleaning logs
- Filter maintenance
- Hygiene activities

### 🛒 Wholesale E-Commerce
- Fish catalogue
- Product / fish details
- Wholesale pricing
- Minimum order quantity (MOQ)
- Customer registration
- Cart and order management
- Order status tracking
- Invoice / order records
- Tiered pricing
- Credit management for B2B customers

### 👥 Customer Management
- Wholesale customer profiles
- Contact information
- Previous orders
- Purchase history
- Customer segmentation
- Interaction logs

### 📊 Admin Dashboard & Reports
- Fish inventory overview
- Orders overview
- Customers overview
- Breeding records
- Sales reports
- Stock reports
- Water quality trends
- Exportable reports — CSV / PDF
- Audit logs

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 21, Spring Boot 3, Spring MVC, Spring Data JPA, Spring Security |
| Database | PostgreSQL 15 |
| Authentication | JWT |
| Frontend | React 18, Vite, Axios, Redux Toolkit / Zustand |
| UI | Tailwind CSS / Material UI / Ant Design |
| Charts | Recharts / Chart.js |
| API Docs | Swagger / OpenAPI |
| Testing | JUnit 5, Mockito, Spring Boot Test |
| DevOps | Docker, Docker Compose, GitHub Actions |
| Cloud | AWS EC2, RDS, S3 / Render / Railway |
| Build Tools | Maven / Gradle, npm |
| Migrations | Flyway / Liquibase |

---

## 🏗️ Architecture

```text
┌─────────────────────┐
│   React Frontend    │
│  (Admin + Customer) │
└──────────┬──────────┘
           │ REST API / JSON
           ▼
┌─────────────────────┐
│  Spring Boot API    │
│  Controller →       │
│  Service →          │
│  Repository →       │
│  Entity             │
└──────────┬──────────┘
           │ JPA / Hibernate
           ▼
┌─────────────────────┐
│    PostgreSQL       │
└─────────────────────┘
```

---

## 📂 Project Structure

```text
piyush-aquatic-smart-farm-management/
├── backend/
│   ├── src/main/java/com/piyushaquatic/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── service/
│   │   └── PiyushAquaticApplication.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   ├── application-dev.yml
│   │   └── db/migration/
│   ├── src/test/java/com/piyushaquatic/
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
├── .github/workflows/ci.yml
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 18+
- npm 9+
- PostgreSQL 15+
- Docker & Docker Compose (optional but recommended)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/piyush-aquatic-smart-farm-management.git
cd piyush-aquatic-smart-farm-management
```

---

### 2. Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

Or on Windows:

```bash
mvnw.cmd spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

### 4. Docker Setup

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

Services:

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8080 |
| PostgreSQL | localhost:5432 |

---

## ⚙️ Environment Variables

### Backend — `application.yml` or `.env`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/piyush_aquatic
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true

jwt:
  secret: YOUR_SECRET_KEY
  expiration: 86400000
```

### Frontend — `.env`

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🔌 API Endpoints — Sample

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login and get JWT |
| POST | `/api/auth/register` | Register customer |
| GET | `/api/fish` | List all fish |
| POST | `/api/fish` | Add fish |
| PUT | `/api/fish/{id}` | Update fish |
| DELETE | `/api/fish/{id}` | Delete fish |
| GET | `/api/tanks` | List tanks |
| POST | `/api/tanks` | Add tank |
| GET | `/api/water-quality` | List water quality records |
| POST | `/api/water-quality` | Add water quality record |
| GET | `/api/breeding` | List breeding records |
| POST | `/api/breeding` | Add breeding record |
| GET | `/api/orders` | List orders |
| POST | `/api/orders` | Place order |
| GET | `/api/customers` | List customers |
| GET | `/api/reports/sales` | Sales report |

Full API documentation available at:

```text
http://localhost:8080/swagger-ui.html
```

---

## 🗄️ Database Schema Overview

Main entities:

- `User`
- `Role`
- `Customer`
- `Fish`
- `FishSpecies`
- `Batch`
- `Tank`
- `BreedingRecord`
- `FryRecord`
- `WaterQualityRecord`
- `HealthRecord`
- `FeedingRecord`
- `MaintenanceRecord`
- `Order`
- `OrderItem`
- `Invoice`
- `Payment`
- `AuditLog`

Relationships:

- One `Customer` can have many `Orders`
- One `Order` can have many `OrderItems`
- One `Tank` can contain many `Fish`
- One `BreedingRecord` can produce many `FryRecords`
- One `Fish` can have many `HealthRecords`
- One `Tank` can have many `WaterQualityRecords`

---

## 🧪 Testing

Backend:

```bash
cd backend
./mvnw test
```

Frontend:

```bash
cd frontend
npm test
```

Recommended:

- Unit tests for services
- Integration tests for repositories
- MockMvc tests for controllers
- Testcontainers for PostgreSQL

---

## 📦 Deployment

### Docker

```bash
docker-compose up --build -d
```

### AWS

Recommended services:

- **EC2** — backend and frontend hosting
- **RDS** — PostgreSQL database
- **S3** — images, invoices, backups
- **CloudFront** — CDN for frontend

### Render / Railway

You can also deploy:

- Backend as a Web Service
- Frontend as a Static Site
- PostgreSQL as a managed database

---

## 🗺️ Roadmap

- [x] Semester 5 — Requirement analysis and field study
- [ ] Semester 6 — Full implementation
- [ ] IoT sensor integration for real-time water quality
- [ ] Mobile app for farm staff
- [ ] AI-based fish health prediction
- [ ] Automated invoice and email notifications
- [ ] Multi-language support — Marathi, Hindi, English

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes

```bash
git commit -m "feat: add your feature"
```

4. Push to the branch

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 👤 Author

**Ram Prakash Gurav**  
UID / Roll No. 43  
TY B.Sc. Information Technology (NEP)  
Project Guide: **Miss Sai Surve**  
Organization: **Piyush Aquatic**  
Location: Dabhil, Taluka Khed, District Ratnagiri, Maharashtra

---

## 🙏 Acknowledgements

- Piyush Aquatic team
- Project Guide — Miss Sai Surve
- Faculty members and participants
- N.E. Society’s D.B.J. College (Autonomous), Chiplun
- FAO aquaculture reference materials
- Open-source Java, Spring, React, and PostgreSQL communities

---

## ⭐ Support

If you find this project useful, please give it a star on GitHub.
