# HireGrid

A modern responsive frontend website for connecting HR and companies with job candidates in Nepal.

## Features

- **Role-based interface** (HR/Employer vs Job Seeker/Employee vs Guest Mode)
- **User Profile System** with photo upload, personal details, and experience
- **Profile Preview** - Hover over "My Profile" to see quick preview
- **Authentication System** with login page and guest browsing
- **Slide-in Animations** for smooth profile transitions
- Search and filter candidates by city, skills, experience, and language
- Upload and download CVs (restricted for guest users)
- **Trending CVs system** with like functionality
- **Social features**: Like CVs to show popularity
- Sort candidates by likes, name, or default order
- Responsive design for desktop and mobile
- Local storage for data persistence

## How to Run

1. Open `index.html` in a web browser
2. Choose your role: **HR / Employer** or **Job Seeker**
3. Select **Sign In** to access your account or **Continue as Guest**
3. **Guest Mode**: Guests go to homepage (profile) with full navigation access, but cannot view candidates
5. **Create Account**: Use the "Create Account" tab to register with name, email, password
5. **Sign In**: Login with your registered credentials
6. **Password Requirements**: Must contain 8+ characters, one number, and one special character (@$!%*?&)
7. **Social Login**: Google and Facebook login buttons (demo alerts)
8. **Remember Me**: Option to stay logged in across sessions

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations, Transitions)
- JavaScript (ES6+)

## File Structure

- `index.html` - Main HTML file with all pages
- `style.css` - Comprehensive stylesheet with animations
- `script.js` - JavaScript functionality and data management
- `logo.png` - Logo image (add your own)

## App Flow

1. **Role Selection**: Choose HR or Job Seeker
2. **Authentication Choice**: Sign In or Guest Mode
3. **Guest Profile**: All guests see identical "Guest User" profile on homepage, full navigation but no candidates access
4. **Account Creation**: Register with required fields and password validation
5. **Login**: Authenticate with email/password or social login
5. **Home Page**: Access to profile, candidates, and upload features
6. **Guest Mode**: Limited access to browse candidates only

## Authentication Features

- **Role-based Registration**: HR vs Job Seeker accounts
- **Secure Passwords**: Number and special character requirements
- **Account Storage**: Local storage for user accounts
- **Social Login**: Google/Facebook integration (demo)
- **Remember Me**: Persistent login sessions
- **Guest Access**: All guests see identical generic profile on homepage, can access navigation but cannot view candidates

## Features Overview

### For HR/Employers:
- Browse candidate profiles with full details
- Filter by location, skills, experience, language
- Download CVs directly
- View trending/popular CVs
- Like CVs to show interest
- Create and manage personal profile
- No CV upload option (as expected)

### For Job Seekers:
- Upload CV with personal details
- Create comprehensive profile with photo, experience, skills
- View other candidates for networking opportunities
- Like popular CVs
- Access all platform features

### Guest Mode:
- Browse candidates without account
- View profiles and trending CVs
- **Cannot upload CV** (shows warning message)
- **Cannot create/edit profile** (shows warning message)
- Can switch to full account anytime

### Profile System:
- **Edit Profile** button prominently displayed at top
- **Home button** with slide-in animation (🏠)
- Profile photo upload with preview
- Required fields: Name, Email, What You Do, Experience
- Optional fields: Age, Skills, City
- Hover preview in navigation
- Persistent data storage

### Navigation:
- **My Profile** (leftmost) with hover tooltip showing profile preview
- **Candidates** - Browse and filter candidates
- **Upload CV** - Available for job seekers only
- Clean, responsive navigation bar
- Smooth transitions between pages
- See trending candidates
- Build professional profile

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Trending CVs System

- **Like Button**: Click the "Like" button on any candidate card to increase their popularity
- **Trending Section**: Home page displays top 6 most liked candidates
- **Sort by Likes**: Filter page allows sorting candidates by number of likes
- **Persistent Likes**: Like counts are saved and persist across sessions