# Digital Business Card Platform (DVC)

A modern, full-stack NFC digital business card platform built with React.js and Node.js.

## 🚀 Features

### Frontend Features
- **Modern Dashboard** - Intuitive card creation interface with real-time preview
- **Template System** - Multiple card templates with customizable styling
- **Live Preview** - Real-time card preview while editing
- **QR Code Generation** - Automatic QR code generation for card sharing
- **Social Sharing** - Built-in sharing functionality
- **Authentication** - Secure user authentication and authorization
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Image Upload** - Profile and cover image upload with compression
- **Color Customization** - Full color palette customization
- **Font Selection** - Multiple font options for personalization

### Backend Features
- **RESTful API** - Clean and scalable API architecture
- **JWT Authentication** - Secure token-based authentication
- **MongoDB Integration** - Robust data storage with Mongoose ODM
- **File Upload Handling** - Multer integration for image uploads
- **Email Services** - Integrated mailing system
- **CORS Configuration** - Proper cross-origin resource sharing setup
- **Error Handling** - Comprehensive error handling middleware
- **Security** - Input validation and sanitization

## 🛠️ Tech Stack

### Frontend
- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API calls
- **QRCode Library** - QR code generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload middleware
- **Bcrypt** - Password hashing
- **Nodemailer** - Email sending service

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dvc
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

## 🚀 Deployment

### Backend Deployment
The backend can be deployed on platforms like:
- Heroku
- Railway
- Vercel
- DigitalOcean

### Frontend Deployment
The frontend can be deployed on:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 📁 Project Structure

```
dvc/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cardController.js
│   │   ├── planController.js
│   │   └── userPlanController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── response.js
│   ├── models/
│   │   ├── Card.js
│   │   ├── Plan.js
│   │   ├── User.js
│   │   └── UserPlan.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cardRoutes.js
│   │   └── planRoutes.js
│   ├── services/
│   │   └── mailService.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── hashToken.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── Pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🎯 Key Components

### Dashboard
- Card creation and editing interface
- Real-time preview functionality
- Template selection
- Color and font customization
- Image upload and management

### Card Viewer
- Public card viewing interface
- QR code integration
- Social sharing capabilities
- Mobile-optimized design

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Session management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Cards
- `GET /api/cards` - Get user's cards
- `POST /api/cards` - Create new card
- `GET /api/cards/:id` - Get specific card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card

### Plans
- `GET /api/plans` - Get available plans
- `POST /api/user-plans` - Subscribe to plan

## 🎨 Customization

The platform supports extensive customization:
- **Colors** - Full color palette for cards
- **Fonts** - Multiple font families
- **Templates** - Different card layouts
- **Styling** - Custom CSS and styling options
- **Branding** - Logo and brand customization

## 📱 Features in Detail

### Card Creation
- Drag-and-drop interface
- Live preview updates
- Template-based design
- Custom styling options
- Image optimization

### QR Code Generation
- Automatic QR code creation
- High-quality output
- Customizable size and format
- Download functionality

### Sharing System
- Social media integration
- Direct link sharing
- QR code sharing
- Email sharing

## 🔒 Security

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- Secure file uploads

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@dvc-platform.com or create an issue in the repository.

## 🔮 Future Enhancements

- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] Advanced templates
- [ ] Integration with CRM systems
- [ ] Mobile app development
- [ ] Offline functionality
- [ ] Advanced sharing options
- [ ] Custom domain support

---

Built with ❤️ by the DVC Team