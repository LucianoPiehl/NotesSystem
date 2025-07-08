#!/bin/bash

DB_NAME="s1"
DB_USER="root"
DB_PASS="123"
FRONTEND_PORT=3000
BACKEND_PORT=8080

echo "Updating packages..."
sudo apt update

echo "Installing necessary dependencies..."
sudo apt install -y openjdk-21-jdk maven nodejs npm mariadb-server git curl

echo "Starting MariaDB..."
sudo systemctl start mariadb
sudo systemctl enable mariadb

echo "Configuring root user with password and mysql_native_password..."
# For MariaDB the correct syntax is:
sudo mariadb <<EOF
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('${DB_PASS}');
FLUSH PRIVILEGES;
EOF

echo "Creating database if it does not exist..."
sudo mariadb -u${DB_USER} -p${DB_PASS} -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo "Starting backend..."
# In WSL gnome-terminal doesn't work, runs in background and logs output
(cd backend && ./mvnw spring-boot:run > backend.log 2>&1 &)

echo "Installing frontend dependencies..."
cd frontend || { echo "Frontend folder not found"; exit 1; }
npm install

echo "Starting frontend..."
npm start > frontend.log 2>&1 &

echo "✅ Application started."
echo "Backend: http://localhost:${BACKEND_PORT}"
echo "Frontend: http://localhost:${FRONTEND_PORT}"
echo "Backend logs at backend/backend.log"
echo "Frontend logs at frontend/frontend.log"
