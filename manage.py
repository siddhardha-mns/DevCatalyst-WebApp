#!/usr/bin/env python
"""
Railway deployment entry point for DevCatalyst Backend.
This file helps Railway detect this as a Python/Django project.
"""
import os
import sys

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Change to backend directory
os.chdir(os.path.join(os.path.dirname(__file__), 'backend'))

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'devcatalyst.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)