# DevCatalyst Backend

Django REST API backend for the DevCatalyst Tech Club platform.

## Railway Deployment

This backend is configured for Railway deployment with the following files:

- `requirements.txt` - Python dependencies
- `Procfile` - Process definitions
- `railway.toml` - Railway configuration
- `nixpacks.toml` - Nixpacks build configuration
- `runtime.txt` - Python version specification
- `railway_deploy.sh` - Deployment script

## Environment Variables Required

Set these in your Railway project:

```bash
SECRET_KEY=your-django-secret-key
DEBUG=False
ALLOWED_HOSTS=*.railway.app
DATABASE_URL=postgresql://... # Auto-set by Railway PostgreSQL
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

## Manual Deployment Commands

If automatic deployment fails, you can run these manually in Railway console:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python populate_events.py
```

## API Endpoints

- `/api/events/` - Event management
- `/api/register/` - Event registrations
- `/admin/` - Django admin panel