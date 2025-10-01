#!/bin/bash

# Railway deployment script for DevCatalyst Backend

echo "🚀 Starting DevCatalyst Backend deployment..."

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Run migrations
echo "🗄️ Running database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Populate sample events (optional)
echo "🎉 Populating sample events..."
python populate_events.py || echo "Events already exist or population failed"

echo "✅ Backend deployment completed successfully!"
echo "🌐 Starting Gunicorn server..."

# Start the server
exec gunicorn devcatalyst.wsgi:application --bind 0.0.0.0:$PORT --workers 3