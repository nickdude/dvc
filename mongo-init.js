// Initialize the database
db = db.getSiblingDB('dvc');

// Create a user for the application
db.createUser({
    user: 'dvcuser',
    pwd: 'dvcpassword',
    roles: [
        {
            role: 'readWrite',
            db: 'dvc'
        }
    ]
});

// Create initial collections (optional)
db.createCollection('users');
db.createCollection('cards');
db.createCollection('plans');

print('Database initialized successfully');