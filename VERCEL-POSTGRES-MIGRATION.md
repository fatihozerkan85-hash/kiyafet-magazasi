# Vercel Postgres (Neon) Migration Guide

## ✅ Neon Database Setup (Completed)
- Region: Washington, D.C., USA (East)
- Plan: Free tier (0.5 GB storage)
- Auth: Disabled
- Environments: Development, Preview, Production
- Custom Prefix: STORAGE
- Project: kiyafet-magazasi-backend

## 📋 Migration Steps

### 1. Get Database Connection String
After connecting Neon to your project, Vercel automatically adds these environment variables:
- `STORAGE_POSTGRES_URL` - Full connection string
- `STORAGE_POSTGRES_PRISMA_URL` - Prisma-optimized URL
- `STORAGE_POSTGRES_URL_NON_POOLING` - Direct connection
- `STORAGE_POSTGRES_USER` - Database user
- `STORAGE_POSTGRES_HOST` - Database host
- `STORAGE_POSTGRES_PASSWORD` - Database password
- `STORAGE_POSTGRES_DATABASE` - Database name

### 2. Install PostgreSQL Client
```bash
cd backend
npm install @vercel/postgres
```

### 3. Database Schema
PostgreSQL tables to create:
- `kategoriler` - Categories
- `urunler` - Products
- `kampanyalar` - Campaigns
- `kuponlar` - Coupons
- `kullanicilar` - Users
- `siparisler` - Orders
- `siparis_urunler` - Order items (junction table)

### 4. Migration Process
1. Update backend/server.js to use PostgreSQL
2. Create database initialization script
3. Test locally (optional)
4. Deploy to Vercel
5. Verify data persistence

## 🔄 MongoDB vs PostgreSQL Differences

| Feature | MongoDB | PostgreSQL |
|---------|---------|------------|
| Data Model | Document (JSON) | Relational (Tables) |
| Schema | Flexible | Fixed schema |
| Queries | MongoDB Query Language | SQL |
| IDs | ObjectId (string) | SERIAL/UUID |
| Arrays | Native support | JSON or junction tables |
| Timestamps | Mongoose timestamps | TIMESTAMP columns |

## 🎯 Next Steps
1. Install @vercel/postgres package
2. Update server.js with PostgreSQL code
3. Create database initialization
4. Deploy and test

## 📝 Notes
- Neon is serverless PostgreSQL, optimized for Vercel
- No connection pooling issues (unlike MongoDB Atlas)
- Auto-scaling and auto-suspend on free tier
- Data persists across deployments
- Vercel Dashboard provides SQL editor for direct queries
