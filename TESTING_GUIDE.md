## Image Upload & Card Data Sync - Test Instructions

### Testing Image Upload Fix (413 Payload Too Large)

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Test Image Upload:**
   - Go to `/dashboard/1`
   - Try uploading a large image (>5MB)
   - Should now compress automatically and upload successfully
   - Check network tab to see compressed image size

### Testing Card Data Sync

1. **Create a new card:**
   - Fill in all form fields (name, job title, company, bio, etc.)
   - Upload profile and cover images
   - Select different profile card style (circle or cover)
   - Change colors and fonts
   - Click "Save"

2. **Generate QR Code:**
   - Click "QR Code" button
   - Copy the URL or scan the QR code

3. **Verify Data Sync:**
   - Open the QR code URL in a new tab/device
   - Check that the card displays exactly as configured:
     - Same profile card style
     - Same images
     - Same colors and fonts
     - Same text content

4. **Test Edit Functionality:**
   - Go to "My Cards" page
   - Click "Edit" on an existing card
   - Should load all previous data correctly
   - Make changes and save
   - Verify changes appear in QR URL

### Expected Results:

✅ **Image Upload:**
- Large images compress automatically
- No more 413 errors
- Loading states during compression
- Compressed images maintain good quality

✅ **Card Data Sync:**
- Dashboard preview matches QR URL exactly
- All styling options saved and loaded
- Edit functionality works correctly
- No data loss between sessions

### If Issues Persist:

1. **Check Backend Logs** for any errors
2. **Check Browser Network Tab** for failed requests
3. **Verify Database** has all card fields saved
4. **Clear Browser Cache** and test again