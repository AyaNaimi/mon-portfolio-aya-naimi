# API Endpoints Documentation

## Projects Endpoints

### GET /api/projects
Fetch all projects from the database.

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "title": "Project Title",
    "description": "Project description",
    "image": "base64_image_or_url",
    "technologies": ["React", "Node.js"],
    "category": "Full-Stack",
    "demoUrl": "https://demo.example.com",
    "githubUrl": "https://github.com/user/repo",
    "featured": true,
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
]
\`\`\`

### POST /api/projects
Create a new project.

**Request Body:**
\`\`\`json
{
  "title": "New Project",
  "description": "Description",
  "image": "base64_string",
  "technologies": ["React"],
  "category": "Full-Stack",
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/user/repo",
  "featured": false
}
\`\`\`

### PUT /api/projects
Update an existing project.

**Request Body:** Same as POST, plus `id` field

### DELETE /api/projects?id=uuid
Delete a project by ID.

## Contact Messages Endpoints

### GET /api/contact
Fetch all contact messages.

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Message subject",
    "message": "Message content",
    "read": false,
    "created_at": "2025-01-01T00:00:00Z"
  }
]
\`\`\`

### POST /api/contact
Submit a new contact message.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Subject",
  "message": "Message content"
}
\`\`\`

### PATCH /api/contact?id=uuid
Mark a message as read/unread.

**Request Body:**
\`\`\`json
{
  "read": true
}
\`\`\`

### DELETE /api/contact?id=uuid
Delete a contact message.

## Error Handling

All endpoints return standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `500` - Server Error

Error responses follow this format:
\`\`\`json
{
  "error": "Error message describing what went wrong"
}
