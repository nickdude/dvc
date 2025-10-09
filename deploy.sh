#!/bin/bash

# DVC Platform Deployment Script
echo "🚀 Starting DVC Platform Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p backend/uploads
mkdir -p ssl

# Copy environment files if they don't exist
if [ ! -f "backend/.env" ]; then
    print_warning "Backend .env file not found. Copying from .env.example..."
    cp backend/.env.example backend/.env
    print_warning "Please edit backend/.env with your actual values!"
fi

if [ ! -f "frontend/.env" ]; then
    print_warning "Frontend .env file not found. Copying from .env.example..."
    cp frontend/.env.example frontend/.env
    print_warning "Please edit frontend/.env with your actual values!"
fi

# Build and start the application
print_status "Building and starting the application with Docker Compose..."
docker-compose down 2>/dev/null
docker-compose build --no-cache
docker-compose up -d

# Wait for services to start
print_status "Waiting for services to start..."
sleep 30

# Check if services are running
print_status "Checking service status..."
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Services are running!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:5000"
    echo "   MongoDB: mongodb://localhost:27017"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Configure your domain in nginx.conf"
    echo "   2. Set up SSL certificates"
    echo "   3. Update environment variables"
    echo "   4. Configure your email settings"
else
    print_error "❌ Some services failed to start. Check logs with: docker-compose logs"
    exit 1
fi

print_status "🎉 Deployment completed successfully!"