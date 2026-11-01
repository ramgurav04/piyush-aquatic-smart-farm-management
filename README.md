# IT Support for Self-Help Groups and Micro-Entrepreneurs

**Piyush Aquatic — Smart Ornamental Fish Farm Management & Wholesale E-Commerce System**

A full-stack digital platform for managing ornamental fish farming operations — including inventory, breeding, tanks, water quality, feeding, wholesale customers, and orders.

**Live Demo:** https://piyush-aquatic-smart-farm-managemen.vercel.app/

---

## Overview

Piyush Aquatic is a micro-entrepreneurial ornamental fish farming organization based in Dabhil, Taluka Khed, District Ratnagiri, Maharashtra. The organization manages approximately **200 glass and fiberglass tanks** and works with species such as **Discus, Angelfish, Arowana, Guppy, Ram Cichlid, and Plecostomus**.

This project is the Semester 6 implementation of **"IT Support for Self-Help Groups and Micro-Entrepreneurs"** — providing a complete digital platform to manage:

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

## Live Demo

🔗 https://piyush-aquatic-smart-farm-managemen.vercel.app/

---

## Features

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

## Architecture & Authentication Flow

The front-end architecture uses **React Context API** for global state management (`AuthContext`) to maintain user identity across page transitions.

