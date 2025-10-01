#!/bin/bash

# DevCatalyst WebApp Startup Script
echo \"🚀 Starting DevCatalyst WebApp...\"
echo \"==================================\"

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
PURPLE='\\033[0;35m'
CYAN='\\033[0;36m'
NC='\\033[0m' # No Color

# Check if both directories exist
if [ ! -d \"backend\" ] || [ ! -d \"frontend\" ]; then
    echo -e \"${RED}❌ Error: backend or frontend directory not found!${NC}\"
    echo \"Please run this script from the project root directory.\"
    exit 1
fi

echo -e \"${CYAN}📂 Project structure verified${NC}\"

# Function to check if Django backend is running
check_backend() {
    if curl -s http://localhost:8000/api/events/ > /dev/null 2>&1; then
        echo -e \"${GREEN}✅ Backend API is running${NC}\"
        return 0
    else
        echo -e \"${YELLOW}⚠️  Backend API not responding${NC}\"
        return 1
    fi
}

# Function to check if Next.js frontend is running
check_frontend() {
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e \"${GREEN}✅ Frontend is running${NC}\"
        return 0
    else
        echo -e \"${YELLOW}⚠️  Frontend not responding${NC}\"
        return 1
    fi
}

echo -e \"${BLUE}🔍 Checking if services are already running...${NC}\"

BACKEND_RUNNING=false
FRONTEND_RUNNING=false

if check_backend; then
    BACKEND_RUNNING=true
fi

if check_frontend; then
    FRONTEND_RUNNING=true
fi

if [ \"$BACKEND_RUNNING\" = true ] && [ \"$FRONTEND_RUNNING\" = true ]; then
    echo -e \"${GREEN}🎉 Both services are already running!${NC}\"
    echo -e \"${CYAN}📱 Frontend: http://localhost:3000${NC}\"
    echo -e \"${PURPLE}🔧 Backend API: http://localhost:8000${NC}\"
    echo -e \"${YELLOW}📊 Admin Panel: http://localhost:8000/admin/${NC}\"
    exit 0
fi

echo -e \"${BLUE}🚀 Starting services...${NC}\"

# Start backend if not running
if [ \"$BACKEND_RUNNING\" = false ]; then
    echo -e \"${PURPLE}🔧 Starting Django backend...${NC}\"
    cd backend
    if [ ! -d \"venv\" ]; then
        echo -e \"${RED}❌ Virtual environment not found! Please run setup first.${NC}\"
        exit 1
    fi
    source venv/bin/activate && python manage.py runserver > /dev/null 2>&1 &
    BACKEND_PID=$!
    cd ..
    sleep 3
fi

# Start frontend if not running
if [ \"$FRONTEND_RUNNING\" = false ]; then
    echo -e \"${CYAN}⚛️  Starting Next.js frontend...${NC}\"
    cd frontend
    if [ ! -d \"node_modules\" ]; then
        echo -e \"${RED}❌ Node modules not found! Please run npm install first.${NC}\"
        exit 1
    fi
    npm run dev > /dev/null 2>&1 &
    FRONTEND_PID=$!
    cd ..
    sleep 5
fi

echo -e \"${GREEN}⏳ Waiting for services to start...${NC}\"
sleep 3

# Final check
echo -e \"${BLUE}🔍 Verifying services...${NC}\"

if check_backend && check_frontend; then
    echo -e \"${GREEN}\"
    echo \"🎉 DevCatalyst WebApp is now running!\"
    echo \"==================================\"
    echo -e \"${CYAN}📱 Frontend:     http://localhost:3000${NC}\"
    echo -e \"${PURPLE}🔧 Backend API:  http://localhost:8000/api/${NC}\"
    echo -e \"${YELLOW}📊 Admin Panel:  http://localhost:8000/admin/${NC}\"
    echo -e \"${GREEN}👤 Admin Login:  admin / admin123${NC}\"
    echo \"\"
    echo -e \"${BLUE}📝 Available API Endpoints:${NC}\"
    echo \"   • GET  /api/events/     - List all events\"
    echo \"   • POST /api/events/     - Create new event\"
    echo \"   • GET  /api/register/   - List registrations\"
    echo \"   • POST /api/register/   - Register for event\"
    echo \"\"
    echo -e \"${CYAN}🛑 To stop services: Press Ctrl+C${NC}\"
else
    echo -e \"${RED}❌ Failed to start one or more services${NC}\"
    echo \"Please check the logs and try again.\"
    exit 1
fi

# Keep script running
while true; do
    sleep 1
done