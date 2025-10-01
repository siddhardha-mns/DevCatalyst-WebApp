# 🚀 DevCatalyst WebApp

A full-stack web application for the DevCatalyst Tech Club, featuring event management, registration functionality, and a stunning retro-futuristic UI design.

![DevCatalyst](https://img.shields.io/badge/DevCatalyst-Tech_Club-00ffff?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Django](https://img.shields.io/badge/Django-5.2-092E20?style=for-the-badge&logo=django)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## Project Structure

```
DevCatalyst-WebApp/
├── frontend/           # Next.js React frontend
│   ├── pages/         # Next.js pages
│   ├── styles/        # CSS styles
│   ├── package.json   # Frontend dependencies
│   └── next.config.js # Next.js configuration
├── backend/           # Django REST API backend
│   ├── devcatalyst/   # Django project settings
│   ├── events/        # Events app
│   ├── venv/          # Python virtual environment
│   ├── manage.py      # Django management script
│   └── requirements.txt # Python dependencies
└── README.md
```

## 🎆 Features

- 🎯 **Event Management**: Complete CRUD operations for events
- 📝 **Registration System**: Simple and intuitive event registration
- 🎨 **Retro-Futuristic UI**: Stunning neon-themed design with glowing effects
- ⚡ **Modern Tech Stack**: Next.js + Django REST Framework
- 📱 **Responsive Design**: Works perfectly on all devices
- 🌐 **Production Ready**: Deployment configurations included
- 🔒 **Secure**: Environment-based configuration and CORS protection
- 🚀 **Fast**: Optimized performance with SSG and API caching

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Create superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## 🚀 Deployment

This project is ready for production deployment! Check out our comprehensive guides:

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[HOSTING_SECRETS.md](./HOSTING_SECRETS.md)** - Security secrets and best practices

### Recommended Hosting:
- **Frontend**: Vercel (Free tier available)
- **Backend**: Railway (Free tier available)
- **Database**: PostgreSQL (included with Railway)

### Quick Deploy:
1. Push to GitHub
2. Connect Railway to backend folder
3. Connect Vercel to frontend folder
4. Set environment variables
5. Deploy! 🎉

## 📊 API Endpoints

- `GET /api/events/` - List all events
- `POST /api/events/` - Create a new event
- `GET /api/events/{id}/` - Get event details
- `PUT /api/events/{id}/` - Update an event
- `DELETE /api/events/{id}/` - Delete an event
- `GET /api/register/` - List all registrations
- `POST /api/register/` - Register for an event

## Technologies Used

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Django 5.2
- Django REST Framework
- django-cors-headers
- SQLite

## Development

### Available Scripts (Frontend)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Django Management Commands

- `python manage.py runserver` - Start development server
- `python manage.py makemigrations` - Create database migrations
- `python manage.py migrate` - Apply database migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py shell` - Open Django shell

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.