# Sistem Peminjaman Alat - Setup Instructions

## 🚀 Quick Start

### Prerequisites
- XAMPP (PHP 8.2+, MySQL)
- Composer
- Node.js & npm

### Setup Steps

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start Apache and MySQL services

2. **Run Setup**
   ```batch
   setup.bat
   ```

3. **Start Development Server**
   ```batch
   run-dev.bat
   ```

4. **Access Application**
   - Open browser: http://127.0.0.1:8000

---

## 📖 Detailed Documentation

For detailed setup instructions, troubleshooting, and manual setup steps, see the complete guide in the `.gemini` folder or follow manual steps below.

---

## 🔧 Manual Setup

If automated setup fails, run these commands:

### 1. Create Database
```sql
CREATE DATABASE api_peminjaman_alat;
```

### 2. Clear Caches
```batch
php artisan config:clear
php artisan cache:clear
```

### 3. Run Migrations
```batch
php artisan migrate
```

### 4. Seed Database
```batch
php artisan db:seed
```

### 5. Build Assets
```batch
npm run build
```

### 6. Start Server
```batch
composer run dev
```

---

## 📁 Project Info

- **Framework**: Laravel 12
- **Frontend**: React + Inertia.js
- **Database**: MySQL
- **Styling**: Tailwind CSS

---

## 🛠️ Common Commands

```batch
# Development
composer run dev          # Start all dev servers
php artisan serve        # Laravel server only
npm run dev             # Vite dev server only

# Database
php artisan migrate     # Run migrations
php artisan db:seed     # Seed database
php artisan migrate:fresh --seed  # Fresh start

# Cache
php artisan optimize:clear  # Clear all caches
```

---

## ⚠️ Troubleshooting

**Database Connection Error?**
- Check XAMPP MySQL is running
- Verify `.env` database credentials

**Asset Errors?**
- Run `npm run build`
- Clear browser cache

**Class Not Found?**
- Run `composer dump-autoload`

---

For complete documentation, see `SETUP_GUIDE.md`
