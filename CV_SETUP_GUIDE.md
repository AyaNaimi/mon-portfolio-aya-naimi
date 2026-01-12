# CV Functionality Setup Guide

This guide explains how to set up and configure the CV (Curriculum Vitae) functionality for your portfolio website.

## Features Implemented

The CV functionality includes:

- **Multiple CV Management**: Upload and manage multiple CV versions
- **Active CV System**: Set one CV as the primary/active version
- **File Storage**: Secure storage using Supabase Storage
- **Database Integration**: Metadata stored in Supabase database
- **Admin Interface**: Complete management dashboard for CVs
- **Public Download**: Visitors can download the active CV
- **File Validation**: Type and size validation for uploaded files

## Database Setup

### 1. Create CV Files Table

Run the migration SQL file in your Supabase dashboard:

```sql
-- Copy the content from supabase/migrations/001_create_cv_files_table.sql
-- and run it in your Supabase SQL Editor
```

This creates:
- `cv_files` table with all necessary fields
- Database triggers for automatic timestamp updates
- Constraints to ensure only one active CV at a time

### 2. Setup Storage Bucket

Run the storage setup SQL:

```sql
-- Copy the content from supabase/migrations/002_create_storage_bucket.sql
-- and run it in your Supabase SQL Editor
```

This creates:
- `portfolio-storage` bucket for CV files
- Public access policies
- File size limits (5MB)
- MIME type restrictions (PDF, DOC, DOCX)

## API Endpoints

### CV Management
- `GET /api/cv` - List all CV files
- `POST /api/cv` - Upload new CV file
- `GET /api/cv/[id]` - Download specific CV
- `DELETE /api/cv/[id]` - Delete CV file
- `POST /api/cv/activate` - Set active CV
- `GET /api/cv/activate` - Get current active CV

## Admin Interface

Access the CV management at `/admin` (requires authentication):

1. **Upload CV**: Drag & drop or select files (PDF, DOC, DOCX only)
2. **Manage CVs**: View, download, or delete existing CVs
3. **Set Active**: Choose which CV should be publicly available
4. **File Info**: See upload date, file size, and type

## Frontend Integration

The public CV download is integrated into the About section:

- Automatically fetches the active CV from database
- Shows download button with appropriate states
- Handles loading and error states gracefully

## File Requirements

- **Formats**: PDF, DOC, DOCX only
- **Size Limit**: 5MB maximum
- **Naming**: Files are automatically renamed with unique identifiers
- **Storage**: Files stored in `portfolio-storage/cv/` directory

## Security Features

- **Authentication**: All admin operations require authentication
- **File Validation**: Type and size checking on upload
- **Storage Security**: RLS policies for secure file access
- **Public Access**: Active CVs are publicly downloadable

## Usage Examples

### Uploading a CV (Admin)
```javascript
const formData = new FormData()
formData.append('file', fileInput.files[0])

fetch('/api/cv', {
  method: 'POST',
  body: formData
})
```

### Setting Active CV (Admin)
```javascript
fetch('/api/cv/activate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ cvId: 'uuid-here' })
})
```

### Downloading CV (Public)
```javascript
fetch('/api/cv/active-cv-id')
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-cv.pdf'
    a.click()
  })
```

## Error Handling

The system includes comprehensive error handling:

- File validation errors
- Storage upload failures
- Database operation errors
- Authentication issues
- Network connectivity problems

## Troubleshooting

### Common Issues

1. **Upload Fails**
   - Check file format (must be PDF/DOC/DOCX)
   - Verify file size (max 5MB)
   - Ensure Supabase storage bucket exists

2. **Download Not Working**
   - Check if active CV is set
   - Verify storage permissions
   - Check network connectivity

3. **Admin Panel Issues**
   - Ensure authentication is working
   - Check database permissions
   - Verify API routes are accessible

### Database Queries

Check active CV:
```sql
SELECT * FROM cv_files WHERE is_active = true;
```

List all CVs:
```sql
SELECT * FROM cv_files ORDER BY uploaded_at DESC;
```

Check storage bucket:
```sql
SELECT * FROM storage.buckets WHERE name = 'portfolio-storage';
```

## Future Enhancements

- CV preview functionality
- Multiple language support
- Version control for CV updates
- Email notifications for CV downloads
- Analytics for CV download tracking

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify Supabase configuration
3. Test API endpoints directly
4. Review database and storage setup