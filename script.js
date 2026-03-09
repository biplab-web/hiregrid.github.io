// Sample candidate data
const defaultCandidates = [
    {
        name: "John Doe",
        city: "Kathmandu",
        skills: ["JavaScript", "React", "Node.js"],
        experience: "3 years",
        degree: "BSc Computer Science",
        languages: ["English", "Nepali"],
        cv: "john_doe_cv.pdf",
        likes: 15
    },
    {
        name: "Jane Smith",
        city: "Pokhara",
        skills: ["Python", "Django", "Machine Learning"],
        experience: "5 years",
        degree: "MSc Data Science",
        languages: ["English", "Hindi"],
        cv: "jane_smith_cv.pdf",
        likes: 22
    },
    {
        name: "Raj Kumar",
        city: "Kathmandu",
        skills: ["Java", "Spring", "SQL"],
        experience: "4 years",
        degree: "BE Software Engineering",
        languages: ["English", "Nepali", "Hindi"],
        cv: "raj_kumar_cv.pdf",
        likes: 8
    },
    {
        name: "Sita Sharma",
        city: "Lalitpur",
        skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
        experience: "2 years",
        degree: "BSc IT",
        languages: ["English", "Nepali"],
        cv: "sita_sharma_cv.pdf",
        likes: 12
    },
    {
        name: "Bikash Thapa",
        city: "Biratnagar",
        skills: ["C++", "Data Structures", "Algorithms"],
        experience: "6 years",
        degree: "MSc Computer Engineering",
        languages: ["English", "Nepali", "Bengali"],
        cv: "bikash_thapa_cv.pdf",
        likes: 18
    },
    {
        name: "Anjali Rai",
        city: "Dharan",
        skills: ["UI/UX Design", "Figma", "Adobe XD"],
        experience: "3 years",
        degree: "BFA Graphic Design",
        languages: ["English", "Nepali"],
        cv: "anjali_rai_cv.pdf",
        likes: 25
    }
];

let candidates = [];
let currentCandidate = null;
let userRole = null;
let isGuestMode = false;
let isLoggedIn = false;
let rememberMe = false;
let selectedRole = null; // Store the selected role before authentication

// Demo/Default user accounts for testing
const demoAccounts = [
    {
        name: "John Smith",
        email: "hr@hiregrid.com",
        password: "HRManager123@",
        role: "hr",
        createdAt: new Date().toISOString()
    },
    {
        name: "Sarah Johnson",
        email: "jobseeker@hiregrid.com",
        password: "JobSeeker123@",
        role: "employee",
        createdAt: new Date().toISOString()
    },
    {
        name: "Demo HR User",
        email: "demo.hr@example.com",
        password: "Demo123@",
        role: "hr",
        createdAt: new Date().toISOString()
    },
    {
        name: "Demo Job Seeker",
        email: "demo.seeker@example.com",
        password: "Demo123@",
        role: "employee",
        createdAt: new Date().toISOString()
    }
];

// Initialize demo accounts on first load
function initializeDemoAccounts() {
    const existingUsers = JSON.parse(localStorage.getItem('hiregrid_users') || '[]');
    if (existingUsers.length === 0) {
        localStorage.setItem('hiregrid_users', JSON.stringify(demoAccounts));
    }
}

// Load data from localStorage
function loadData() {
    // Initialize demo accounts if needed
    initializeDemoAccounts();
    
    const storedCandidates = localStorage.getItem('hiregrid_candidates');
    candidates = storedCandidates ? JSON.parse(storedCandidates) : [...defaultCandidates];

    // Check if user was remembered
    const storedRememberMe = localStorage.getItem('hiregrid_remember_me');
    if (storedRememberMe === 'true') {
        const storedRole = localStorage.getItem('hiregrid_role');
        const storedLoginStatus = localStorage.getItem('hiregrid_logged_in');
        
        if (storedLoginStatus === 'true' && storedRole) {
            userRole = storedRole;
            isLoggedIn = true;
            rememberMe = true;
            updateUIForRole();
            showPage('home');
            return;
        }
    }

    const storedRole = localStorage.getItem('hiregrid_role');
    if (storedRole) {
        userRole = storedRole;
        updateUIForRole();
    }

    const storedGuestMode = localStorage.getItem('hiregrid_guest_mode');
    if (storedGuestMode) {
        isGuestMode = true;
        userRole = 'guest';
        updateUIForRole();
    }
    
    updateAuthUI();
}

// Save candidates to localStorage
function saveCandidates() {
    localStorage.setItem('hiregrid_candidates', JSON.stringify(candidates));
}

// Save role to localStorage
function saveRole() {
    localStorage.setItem('hiregrid_role', userRole);
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMeChecked = document.getElementById('remember-me').checked;
    
    // Validation
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // Check against stored users
    const users = JSON.parse(localStorage.getItem('hiregrid_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Invalid email or password');
        return;
    }
    
    // Set authentication state
    userRole = user.role;
    isLoggedIn = true;
    isGuestMode = false;
    rememberMe = rememberMeChecked;
    
    // Save to localStorage
    localStorage.setItem('hiregrid_role', user.role);
    localStorage.setItem('hiregrid_logged_in', 'true');
    localStorage.setItem('hiregrid_remember_me', rememberMeChecked ? 'true' : 'false');
    localStorage.setItem('hiregrid_current_user', JSON.stringify(user));
    localStorage.removeItem('hiregrid_guest_mode'); // Clear guest mode
    
    updateUIForRole();
    updateAuthUI();
    updateHomepageFeatures();
    showPage('home');
}

// Select user role
function selectRole(role) {
    selectedRole = role;
    showPage('auth-choice');
}

// Show login tab
function showLoginTab() {
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
    document.getElementById('login-form-container').style.display = 'block';
    document.getElementById('register-form-container').style.display = 'none';
}

// Show register tab
function showRegisterTab() {
    document.getElementById('register-tab').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('register-form-container').style.display = 'block';
    document.getElementById('login-form-container').style.display = 'none';
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const termsAccepted = document.getElementById('register-terms').checked;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (!termsAccepted) {
        alert('Please accept the Terms of Service and Privacy Policy');
        return;
    }
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('hiregrid_users') || '[]');
    if (existingUsers.find(user => user.email === email)) {
        alert('An account with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        name,
        email,
        password, // In a real app, this would be hashed
        role: selectedRole,
        createdAt: new Date().toISOString()
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('hiregrid_users', JSON.stringify(existingUsers));
    
    alert('Account created successfully! Please sign in with your credentials.');
    showLoginTab();
}

// Social login functions (dummy implementations)
function loginWithGoogle() {
    alert('Google login would be implemented here with OAuth');
    // In a real app, this would redirect to Google OAuth
}

function loginWithFacebook() {
    alert('Facebook login would be implemented here with OAuth');
    // In a real app, this would redirect to Facebook OAuth
}

function registerWithGoogle() {
    alert('Google registration would be implemented here with OAuth');
}

function registerWithFacebook() {
    alert('Facebook registration would be implemented here with OAuth');
}

// Load data from localStorage
function updateAuthUI() {
    const profileFormSection = document.getElementById('profile-form-section');
    const profileViewSection = document.getElementById('profile-view-section');
    
    if (!isLoggedIn && !isGuestMode) {
        // Hide profile sections for unauthenticated users
        profileFormSection.style.display = 'none';
        profileViewSection.style.display = 'none';
    } else {
        // Show profile sections for authenticated users
        profileFormSection.style.display = 'block';
        // profileViewSection will be shown by initializeProfilePage if needed
    }
}

// Logout function
function logout() {
    userRole = null;
    isGuestMode = false;
    isLoggedIn = false;
    rememberMe = false;
    
    localStorage.removeItem('hiregrid_role');
    localStorage.removeItem('hiregrid_guest_mode');
    localStorage.removeItem('hiregrid_logged_in');
    localStorage.removeItem('hiregrid_remember_me');
    localStorage.removeItem('hiregrid_current_user');
    
    updateAuthUI();
    showPage('role-selection');
}

// Update homepage features based on user authentication
function updateHomepageFeatures() {
    const candidatesFeature = document.getElementById('candidates-feature');
    const uploadFeature = document.getElementById('upload-feature');
    const quickCandidates = document.getElementById('quick-candidates');
    const quickUpload = document.getElementById('quick-upload');
    
    if (isLoggedIn && !isGuestMode) {
        // Show all features for logged-in users
        if (candidatesFeature) candidatesFeature.style.display = 'block';
        if (uploadFeature) uploadFeature.style.display = 'block';
        if (quickCandidates) quickCandidates.style.display = 'inline-flex';
        if (quickUpload) quickUpload.style.display = 'inline-flex';
    } else if (isGuestMode) {
        // Hide candidates and upload for guests
        if (candidatesFeature) candidatesFeature.style.display = 'none';
        if (uploadFeature) uploadFeature.style.display = 'none';
        if (quickCandidates) quickCandidates.style.display = 'none';
        if (quickUpload) quickUpload.style.display = 'none';
    }
}

// Set guest mode
function setGuestMode() {
    userRole = 'guest';
    isGuestMode = true;
    isLoggedIn = false;
    rememberMe = false;
    
    localStorage.setItem('hiregrid_guest_mode', 'true');
    localStorage.removeItem('hiregrid_role');
    localStorage.removeItem('hiregrid_logged_in');
    localStorage.removeItem('hiregrid_remember_me');
    
    updateUIForRole();
    updateAuthUI();
    updateHomepageFeatures();
    showPage('home');
}

// Show specific page
function showPage(pageId) {
    // Allow access to initial pages for unauthenticated users
    if (!isLoggedIn && !isGuestMode && !['role-selection', 'auth-choice', 'login'].includes(pageId)) {
        showPage('role-selection');
        return;
    }

    // Restrict upload for guest mode
    if (isGuestMode && pageId === 'upload') {
        alert('Guest mode does not support CV uploads. Please sign in to upload your CV.');
        return;
    }

    // Restrict candidates page for guest mode
    if (isGuestMode && pageId === 'candidates') {
        alert('Candidates page is not available for guest users.');
        return;
    }

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    if (pageId === 'candidates') {
        displayCandidates(candidates);
    } else if (pageId === 'profile') {
        updateAuthUI();
        initializeProfilePage();
    } else if (pageId === 'home') {
        updateHomepageFeatures();
    }
}

// Apply filters on candidates page
function applyFilters() {
    let city = document.getElementById('filter-city').value;
    if (city === 'other') {
        city = document.getElementById('filter-city-custom').value.toLowerCase();
    }
    const name = document.getElementById('search-name').value.toLowerCase();
    const skill = document.getElementById('filter-skill').value.toLowerCase();
    const experience = document.getElementById('filter-experience').value.toLowerCase();
    const language = document.getElementById('filter-language').value.toLowerCase();
    const sortBy = document.getElementById('sort-by').value;

    let filtered = candidates;

    if (name) {
        filtered = filtered.filter(c => c.name.toLowerCase().includes(name));
    }
    if (city) {
        filtered = filtered.filter(c => c.city.toLowerCase().includes(city));
    }
    if (skill) {
        filtered = filtered.filter(c => c.skills.some(s => s.toLowerCase().includes(skill)));
    }
    if (experience) {
        filtered = filtered.filter(c => c.experience.toLowerCase().includes(experience));
    }
    if (language) {
        filtered = filtered.filter(c => c.languages.some(l => l.toLowerCase().includes(language)));
    }

    // Sort
    if (sortBy === 'likes') {
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    displayCandidates(filtered);
}

// Display candidate cards
function displayCandidates(candidateList) {
    const container = document.getElementById('candidate-list');
    container.innerHTML = '';

    candidateList.forEach((candidate, index) => {
        const card = document.createElement('div');
        card.className = 'candidate-card';
        card.innerHTML = `
            <h4>${candidate.name}</h4>
            <p><strong>Skills:</strong> ${candidate.skills.join(', ')}</p>
            <p><strong>City:</strong> ${candidate.city}</p>
            <p><strong>Experience:</strong> ${candidate.experience}</p>
            <div class="card-footer">
                <span class="likes-count">👍 ${candidate.likes || 0} likes</span>
                <button class="like-btn" onclick="toggleLike(${index})">Like</button>
                <button onclick="viewProfile(${index})">View Profile</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// View candidate profile
function viewProfile(index) {
    currentCandidate = candidates[index];
    const profileDiv = document.getElementById('profile-details');
    profileDiv.innerHTML = `
        <div class="profile-photo">👤</div>
        <div class="profile-info">
            <h3>${currentCandidate.name}</h3>
            <p><strong>City:</strong> ${currentCandidate.city}</p>
            <p><strong>Degree:</strong> ${currentCandidate.degree}</p>
            <p><strong>Languages:</strong> ${currentCandidate.languages.join(', ')}</p>
            <p><strong>Skills:</strong> ${currentCandidate.skills.join(', ')}</p>
        </div>
        <div class="experience-section">
            <h4>Experience</h4>
            <p>${currentCandidate.experience}</p>
        </div>
        <button class="download-btn" onclick="downloadCV()">Download CV</button>
    `;
    showPage('profile');
}

// Download CV
function downloadCV() {
    if (currentCandidate.cv.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = currentCandidate.cv;
        link.download = currentCandidate.cvName || 'cv.pdf';
        link.click();
    } else {
        alert(`Downloading CV for ${currentCandidate.name} (placeholder)`);
    }
}

// Form validation and submission for CV upload
document.getElementById('cv-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('upload-name').value.trim();
    const city = document.getElementById('upload-city').value.trim();
    const degree = document.getElementById('upload-degree').value.trim();
    const skills = document.getElementById('upload-skills').value.trim().split(',').map(s => s.trim());
    const experience = document.getElementById('upload-experience').value.trim();
    const languages = document.getElementById('upload-languages').value.trim().split(',').map(l => l.trim());
    const cvFile = document.getElementById('upload-cv').files[0];

    // Basic validation
    if (!name || !city || !degree || skills.length === 0 || !experience || languages.length === 0 || !cvFile) {
        alert('Please fill in all fields and upload a CV file.');
        return;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(cvFile.type)) {
        alert('Please upload a PDF or Word document.');
        return;
    }

    // Read the file and add to candidates
    const statusDiv = document.getElementById('upload-status');
    statusDiv.style.display = 'block';
    statusDiv.textContent = 'Uploading...';
    statusDiv.style.color = 'orange';

    const reader = new FileReader();
    reader.onload = function(e) {
        const newCandidate = {
            name,
            city,
            skills,
            experience,
            degree,
            languages,
            cv: e.target.result,
            cvName: cvFile.name,
            likes: 0
        };
        candidates.push(newCandidate);
        saveCandidates();

        statusDiv.textContent = 'CV uploaded successfully!';
        statusDiv.style.color = 'green';
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);

        document.getElementById('cv-form').reset();
        showPage('home');
    };
    reader.readAsDataURL(cvFile);
});

// Display trending candidates
function displayTrending() {
    const trendingContainer = document.getElementById('trending-list');
    if (!trendingContainer) return;

    const trendingCandidates = [...candidates]
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 6); // Top 6

    trendingContainer.innerHTML = '';
    trendingCandidates.forEach((candidate, index) => {
        const item = document.createElement('div');
        item.className = 'trending-item';
        item.innerHTML = `
            <h4>${candidate.name}</h4>
            <p><strong>Skills:</strong> ${candidate.skills.slice(0, 2).join(', ')}${candidate.skills.length > 2 ? '...' : ''}</p>
            <p><strong>City:</strong> ${candidate.city}</p>
            <p class="trending-likes">👍 ${candidate.likes || 0} likes</p>
        `;
        item.onclick = () => viewProfile(candidates.indexOf(candidate));
        trendingContainer.appendChild(item);
    });
}

// ============= USER PROFILE FUNCTIONS =============

// Load user profile from localStorage
function loadUserProfile() {
    // Return generic guest profile for guest users
    if (isGuestMode) {
        return {
            name: "Guest User",
            email: "guest@hiregrid.com",
            age: null,
            roleDesc: "Guest browsing HireGrid platform",
            experience: "Viewing available job opportunities",
            skills: "General interest in job market",
            city: "Kathmandu",
            photo: null,
            role: "guest",
            createdAt: new Date().toISOString()
        };
    }
    
    const profileData = localStorage.getItem('userProfile');
    return profileData ? JSON.parse(profileData) : null;
}

// Save user profile to localStorage
function saveUserProfile(profileData) {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
}

// Handle city dropdown for custom input
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data and demo accounts
    loadData();
    
    const profileCitySelect = document.getElementById('profile-city');
    if (profileCitySelect) {
        profileCitySelect.addEventListener('change', function() {
            const customCityInput = document.getElementById('profile-city-custom');
            if (this.value === 'other') {
                customCityInput.style.display = 'block';
                customCityInput.required = true;
            } else {
                customCityInput.style.display = 'none';
                customCityInput.required = false;
            }
        });
    }

    // Handle profile photo upload
    const profilePhotoInput = document.getElementById('profile-photo');
    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const photoPreview = document.getElementById('photo-preview');
                    photoPreview.style.backgroundImage = `url(${event.target.result})`;
                    photoPreview.textContent = '';
                    photoPreview.classList.add('has-image');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Handle profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Prevent guests from saving profiles
            if (isGuestMode) {
                alert('Guest users cannot save or modify profiles. Please create an account to save your profile.');
                return;
            }

            // Get form values
            const name = document.getElementById('profile-name').value.trim();
            const email = document.getElementById('profile-email').value.trim();
            const age = document.getElementById('profile-age').value || null;
            const roleDesc = document.getElementById('profile-role').value.trim();
            const experience = document.getElementById('profile-experience').value.trim();
            const skills = document.getElementById('profile-skills').value;
            let city = document.getElementById('profile-city').value;
            
            // Handle custom city
            if (city === 'other') {
                city = document.getElementById('profile-city-custom').value.trim();
            }

            const photoPreview = document.getElementById('photo-preview');
            const photoData = photoPreview.style.backgroundImage ? photoPreview.style.backgroundImage : null;

            // Validate required fields
            if (!name || !email || !roleDesc || !experience) {
                alert('Please fill in all required fields (Name, Email, What You Do, Experience)');
                return;
            }

            // Save profile
            const profileData = {
                name,
                email,
                age,
                roleDesc,
                experience,
                skills,
                city,
                photo: photoData,
                role: userRole || 'employee',
                createdAt: new Date().toISOString()
            };

            saveUserProfile(profileData);

            // Show profile view
            displayUserProfile(profileData);
            showProfileView();
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Initialize profile preview on page load
    updateProfilePreview();
});

// Display user profile in view section
function displayUserProfile(profileData) {
    if (!profileData) return;

    // Header info
    document.getElementById('view-name').textContent = profileData.name;
    document.getElementById('view-email').textContent = profileData.email;
    document.getElementById('view-role').textContent = profileData.roleDesc;

    // Age display
    const ageDisplay = document.getElementById('age-display');
    if (profileData.age) {
        ageDisplay.style.display = 'block';
        document.getElementById('view-age').textContent = profileData.age;
    } else {
        ageDisplay.style.display = 'none';
    }

    // City display
    const cityDisplay = document.getElementById('city-display');
    if (profileData.city) {
        cityDisplay.style.display = 'block';
        document.getElementById('view-city').textContent = profileData.city;
    } else {
        cityDisplay.style.display = 'none';
    }

    // Description
    document.getElementById('view-role-desc').textContent = profileData.roleDesc;
    document.getElementById('view-experience').textContent = profileData.experience;

    // Skills
    if (profileData.skills) {
        const skillsArray = profileData.skills.split(',').map(s => s.trim()).filter(s => s);
        const skillsSection = document.getElementById('skills-section');
        const viewSkills = document.getElementById('view-skills');
        
        if (skillsArray.length > 0) {
            skillsSection.style.display = 'block';
            viewSkills.innerHTML = skillsArray.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('');
        } else {
            skillsSection.style.display = 'none';
        }
    } else {
        document.getElementById('skills-section').style.display = 'none';
    }

    // Photo
    const photoDisplay = document.getElementById('profile-photo-display');
    if (profileData.photo) {
        photoDisplay.style.backgroundImage = profileData.photo;
        photoDisplay.textContent = '';
    } else {
        photoDisplay.style.backgroundImage = 'none';
        photoDisplay.textContent = '👤';
    }

    // Hide edit button and modify action buttons for guests
    const editBtn = document.getElementById('edit-profile-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const guestModeBtn = document.getElementById('guest-mode-btn');
    
    if (isGuestMode) {
        editBtn.style.display = 'none';
        logoutBtn.textContent = 'Exit Guest Mode';
        logoutBtn.onclick = function() { showPage('role-selection'); };
        guestModeBtn.style.display = 'none';
    } else {
        editBtn.style.display = 'inline-block';
        logoutBtn.textContent = 'Logout';
        logoutBtn.onclick = logout;
        guestModeBtn.style.display = 'inline-block';
    }

    // Update preview in navigation
    updateProfilePreview();
}

// Toggle between form and view
function showProfileForm() {
    document.getElementById('profile-form-section').style.display = 'block';
    document.getElementById('profile-view-section').style.display = 'none';

    // Load existing profile data into form if it exists
    const profileData = loadUserProfile();
    if (profileData) {
        document.getElementById('profile-name').value = profileData.name;
        document.getElementById('profile-email').value = profileData.email;
        document.getElementById('profile-age').value = profileData.age || '';
        document.getElementById('profile-role').value = profileData.roleDesc;
        document.getElementById('profile-experience').value = profileData.experience;
        document.getElementById('profile-skills').value = profileData.skills || '';
        document.getElementById('profile-city').value = profileData.city || '';

        if (profileData.photo) {
            const photoPreview = document.getElementById('photo-preview');
            photoPreview.style.backgroundImage = profileData.photo;
            photoPreview.textContent = '';
            photoPreview.classList.add('has-image');
        }
    }
}

function showProfileView() {
    document.getElementById('profile-form-section').style.display = 'none';
    document.getElementById('profile-view-section').style.display = 'block';

    const profileData = loadUserProfile();
    if (profileData) {
        displayUserProfile(profileData);
    }
}

// Initialize profile page when loaded
function initializeProfilePage() {
    const profileData = loadUserProfile();
    if (profileData) {
        showProfileView();
        displayUserProfile(profileData);
    } else {
        showProfileForm();
    }
}

// Update profile preview in navigation tooltip
function updateProfilePreview() {
    const profileData = loadUserProfile();
    const previewName = document.getElementById('preview-name');
    const previewRole = document.getElementById('preview-role');
    const previewPhoto = document.getElementById('preview-photo');

    if (profileData) {
        previewName.textContent = profileData.name;
        previewRole.textContent = profileData.roleDesc;
        
        if (profileData.photo) {
            previewPhoto.style.backgroundImage = profileData.photo;
            previewPhoto.textContent = '';
            previewPhoto.classList.add('has-image');
        }
    } else {
        previewName.textContent = 'Sign In';
        previewRole.textContent = 'View your profile';
        previewPhoto.style.backgroundImage = 'none';
        previewPhoto.textContent = '📷';
        previewPhoto.classList.remove('has-image');
    }
}

// Slide in profile view with animation
function slideInProfile() {
    const profileView = document.getElementById('profile-view-section');
    profileView.classList.add('slide-in');
    showPage('profile');
}