from events.models import Event
from datetime import date, timedelta

# Create sample events
events_data = [
    {
        'title': 'Python Workshop',
        'description': 'Learn Python programming fundamentals and advanced concepts.',
        'date': date.today() + timedelta(days=7)
    },
    {
        'title': 'React.js Masterclass',
        'description': 'Build modern web applications with React.js and Next.js.',
        'date': date.today() + timedelta(days=14)
    },
    {
        'title': 'Machine Learning Bootcamp',
        'description': 'Introduction to ML algorithms and practical applications.',
        'date': date.today() + timedelta(days=21)
    },
    {
        'title': 'DevOps Fundamentals',
        'description': 'Learn Docker, CI/CD, and cloud deployment strategies.',
        'date': date.today() + timedelta(days=28)
    }
]

for event_data in events_data:
    event, created = Event.objects.get_or_create(
        title=event_data['title'],
        defaults=event_data
    )
    if created:
        print(f"Created event: {event.title}")
    else:
        print(f"Event already exists: {event.title}")

print("Sample events created successfully!")