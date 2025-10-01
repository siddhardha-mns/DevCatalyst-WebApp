#!/bin/bash
# Database setup script for Railway deployment

echo "🚀 Setting up DevCatalyst database..."

# Run migrations
python manage.py migrate

# Create superuser (optional)
echo "Creating superuser..."
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@devcatalyst.com', 'admin123') if not User.objects.filter(username='admin').exists() else None" | python manage.py shell

# Populate sample events
python populate_events.py

# Collect static files
python manage.py collectstatic --noinput

echo "✅ Database setup completed!"