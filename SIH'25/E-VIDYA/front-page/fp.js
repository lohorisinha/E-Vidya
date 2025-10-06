// Global variables for modal state
let currentAuthType = 'student';
let currentAuthMode = 'login';
let currentTestimonial = 0;

// User Management System
let currentUser = null;
let selectedAvatar = '🐰'; // Default avatar

// Animal avatars array
const animalAvatars = ['🐰', '🐱', '🐶', '🐼', '🦊', '🐨', '🐧', '🦋'];

// Dynamic tagline functionality
const taglines = [
    "Learn. Play. Conquer Science & Math!",
    "Interactive Learning Made Fun!",
    "Discover the Joy of Science & Math!",
    "Your Gateway to Academic Excellence!"
];

const teacherTaglines = [
    "Empower Your Teaching with Data-Driven Insights",
    "Transform Education with Interactive Analytics",
    "Monitor Student Success in Real-Time",
    "Create Engaging Learning Experiences"
];

let taglineIndex = 0;

// Mock data for teacher dashboard with avatars
const mockStudentData = [
    {
        id: 1, name: "Aarav Sharma", email: "aarav.sharma@email.com", class: 10, 
        totalQuizzes: 15, averageScore: 87, lastActive: "2025-09-18", 
        subjects: { mathematics: 89, science: 85, technology: 87 },
        recentScores: [78, 82, 89, 87, 91, 85, 89],
        achievements: 5, timeSpent: 45, improvement: "+8%", avatar: "🐶"
    },
    {
        id: 2, name: "Priya Patel", email: "priya.patel@email.com", class: 9,
        totalQuizzes: 22, averageScore: 92, lastActive: "2025-09-19",
        subjects: { mathematics: 94, science: 90, technology: 92 },
        recentScores: [85, 88, 92, 91, 95, 89, 94],
        achievements: 8, timeSpent: 52, improvement: "+12%", avatar: "🐱"
    },
    {
        id: 3, name: "Rohit Kumar", email: "rohit.kumar@email.com", class: 11,
        totalQuizzes: 18, averageScore: 78, lastActive: "2025-09-17",
        subjects: { mathematics: 82, science: 75, technology: 77 },
        recentScores: [70, 75, 78, 80, 82, 76, 79],
        achievements: 3, timeSpent: 38, improvement: "+5%", avatar: "🐼"
    },
    {
        id: 4, name: "Sneha Reddy", email: "sneha.reddy@email.com", class: 12,
        totalQuizzes: 25, averageScore: 95, lastActive: "2025-09-19",
        subjects: { mathematics: 96, science: 94, technology: 95 },
        recentScores: [88, 92, 95, 94, 97, 93, 96],
        achievements: 12, timeSpent: 48, improvement: "+15%", avatar: "🦊"
    },
    {
        id: 5, name: "Arjun Singh", email: "arjun.singh@email.com", class: 8,
        totalQuizzes: 12, averageScore: 73, lastActive: "2025-09-18",
        subjects: { mathematics: 75, science: 71, technology: 73 },
        recentScores: [68, 70, 73, 75, 76, 72, 74],
        achievements: 2, timeSpent: 32, improvement: "+3%", avatar: "🐨"
    },
    {
        id: 6, name: "Kavya Iyer", email: "kavya.iyer@email.com", class: 10,
        totalQuizzes: 19, averageScore: 88, lastActive: "2025-09-19",
        subjects: { mathematics: 90, science: 86, technology: 88 },
        recentScores: [82, 85, 88, 87, 91, 86, 90],
        achievements: 6, timeSpent: 41, improvement: "+9%", avatar: "🐰"
    }
];

const mockQuizData = [
    {
        id: 1, title: "Probability Basics", subject: "Mathematics", class: 10,
        totalAttempts: 45, averageScore: 82, difficulty: "Medium",
        createdDate: "2025-09-10", lastAttempt: "2025-09-18", active: true
    },
    {
        id: 2, title: "Chemical Reactions", subject: "Science", class: 9,
        totalAttempts: 38, averageScore: 79, difficulty: "Hard",
        createdDate: "2025-09-05", lastAttempt: "2025-09-19", active: true
    },
    {
        id: 3, title: "Basic Programming", subject: "Technology", class: 11,
        totalAttempts: 22, averageScore: 88, difficulty: "Easy",
        createdDate: "2025-09-12", lastAttempt: "2025-09-17", active: true
    }
];

// Mock quiz history for students
const mockQuizHistory = [
    {
        id: 1, subject: 'Mathematics', topic: 'Probability', class: 10,
        score: 85, points: 170, totalQuestions: 20, correctAnswers: 17,
        date: '2025-09-15', timeSpent: 12
    },
    {
        id: 2, subject: 'Mathematics', topic: 'Algebra', class: 10,
        score: 92, points: 184, totalQuestions: 25, correctAnswers: 23,
        date: '2025-09-10', timeSpent: 18
    },
    {
        id: 3, subject: 'Science', topic: 'Physics - Motion', class: 10,
        score: 78, points: 156, totalQuestions: 15, correctAnswers: 12,
        date: '2025-09-05', timeSpent: 15
    }
];

// Mock achievements data
const achievements = [
    { id: 'first_quiz', title: 'First Steps', description: 'Complete your first quiz', icon: '🎯', unlocked: true },
    { id: 'math_master', title: 'Math Master', description: 'Score above 90% in 5 math quizzes', icon: '📐', unlocked: false },
    { id: 'speed_demon', title: 'Speed Demon', description: 'Complete a quiz in under 10 minutes', icon: '⚡', unlocked: true },
    { id: 'perfect_score', title: 'Perfect Score', description: 'Get 100% on any quiz', icon: '💯', unlocked: false },
    { id: 'science_lover', title: 'Science Enthusiast', description: 'Complete 10 science quizzes', icon: '🔬', unlocked: false },
    { id: 'consistent_learner', title: 'Consistent Learner', description: 'Take quizzes for 7 days straight', icon: '📅', unlocked: false }
];

// Chart instances for cleanup
let performanceChart, subjectScoresChart, scoreDistributionChart, gradePerformanceChart;
let engagementChart, weeklyProgressChart;

// Initialize dynamic content
document.addEventListener('DOMContentLoaded', function() {
    // Start tagline rotation
    setInterval(rotateTagline, 4000);
    
    // Start stats animation
    setTimeout(animateStats, 500);
    
    // Start testimonial rotation
    setInterval(nextTestimonial, 5000);
    
    // Check localStorage for existing user session
    const savedUser = localStorage.getItem('evidya_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
        updatePageForUserType();
    } else {
        // Default to student view
        updatePageForUserType('student');
    }
    
    // Load default subjects based on current state
    const userType = currentUser ? currentUser.role : 'student';
    loadSubjects(userType);
    
    // Load default testimonials
    loadTestimonials(userType);
    
    // Close profile menu when clicking outside
    document.addEventListener('click', function(e) {
        const profileDropdown = document.querySelector('.profile-dropdown');
        if (profileDropdown && !profileDropdown.contains(e.target)) {
            const profileMenu = document.getElementById('profileMenu');
            if (profileMenu) {
                profileMenu.style.display = 'none';
                profileDropdown.classList.remove('active');
            }
        }
    });
    
    console.log('E-Vidya app initialized successfully!');
});

// Avatar selection functions
function selectAvatar(avatar) {
    selectedAvatar = avatar;
    document.getElementById('selectedAvatar').value = avatar;
    
    // Update UI selection
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`[data-avatar="${avatar}"]`).classList.add('selected');
}

function selectProfileAvatar(avatar) {
    document.getElementById('selectedProfileAvatar').value = avatar;
    
    // Update UI selection
    document.querySelectorAll('#profileAvatarGroup .avatar-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`#profileAvatarGroup [data-avatar="${avatar}"]`).classList.add('selected');
}

// Rotate taglines based on user type
function rotateTagline() {
    const taglineElement = document.getElementById('dynamicTagline');
    if (taglineElement) {
        const currentTaglines = (currentUser && currentUser.role === 'teacher') ? teacherTaglines : taglines;
        taglineIndex = (taglineIndex + 1) % currentTaglines.length;
        taglineElement.textContent = currentTaglines[taglineIndex];
    }
}

// 🔧 FIXED: Update page content based on user type - PROPER TEACHER/STUDENT SEPARATION
function updatePageForUserType(userType = null) {
    const type = userType || (currentUser ? currentUser.role : 'student');
    
    if (type === 'teacher') {
        // Update navigation
        document.getElementById('subjectsLink').textContent = 'Analytics';
        document.getElementById('featuresLink').textContent = 'Dashboard';
        document.getElementById('featuresLink').onclick = () => scrollToSection('hero');
        
        // Show/hide sections based on teacher login status
        if (currentUser && currentUser.role === 'teacher') {
            // 🎯 LOGGED IN TEACHER - Show ONLY teacher dashboard
            document.getElementById('studentHero').style.display = 'none';
            document.getElementById('teacherHero').style.display = 'none';
            document.getElementById('teacherDashboard').style.display = 'block';
            
            // Hide ALL student sections
            document.getElementById('teacherFeatures').style.display = 'none';
            document.getElementById('features').style.display = 'none';
            document.getElementById('demoSection').style.display = 'none';
            
            // Update subjects section for teacher analytics
            document.getElementById('subjectsTitle').textContent = 'Subject Analytics Dashboard';
            document.getElementById('subjectsSubtitle').textContent = 'Monitor student performance across all subjects with detailed insights and charts';
            
            // Hide CTA section when logged in
            document.body.classList.add('user-logged-in');
        } else {
            // 🎯 NOT LOGGED IN TEACHER - Show teacher landing page
            document.getElementById('studentHero').style.display = 'none';
            document.getElementById('teacherHero').style.display = 'block';
            document.getElementById('teacherDashboard').style.display = 'none';
            
            // Show teacher features but NOT student features
            document.getElementById('teacherFeatures').style.display = 'block';
            document.getElementById('features').style.display = 'none';
            document.getElementById('demoSection').style.display = 'none'; // NO student demo
            
            document.body.classList.remove('user-logged-in');
        }
        
        // Update testimonials for teachers
        document.getElementById('testimonialsTitle').textContent = 'What Teachers Say';
        loadTestimonials('teacher');
        
        // Update CTA for teachers
        document.getElementById('ctaTitle').textContent = 'Ready to Transform Your Classroom?';
        document.getElementById('ctaDescription').textContent = 'Join hundreds of teachers who are using data-driven insights to improve student outcomes!';
        
        // Update stats for teacher
        updateTeacherStats();
        
        // Load teacher analytics view
        loadSubjects('teacher');
        
    } else {
        // 🎯 STUDENT VIEW (default)
        document.getElementById('subjectsLink').textContent = 'Subjects';
        document.getElementById('featuresLink').textContent = 'Features';
        document.getElementById('featuresLink').onclick = () => scrollToSection('features');
        
        if (currentUser && currentUser.role === 'student') {
            // Hide CTA section when student is logged in
            document.body.classList.add('user-logged-in');
        } else {
            document.body.classList.remove('user-logged-in');
        }
        
        // Show student sections
        document.getElementById('studentHero').style.display = 'block';
        document.getElementById('teacherHero').style.display = 'none';
        document.getElementById('teacherDashboard').style.display = 'none';
        document.getElementById('teacherFeatures').style.display = 'none';
        document.getElementById('features').style.display = 'block';
        document.getElementById('demoSection').style.display = 'block';
        
        // Reset testimonials for students
        document.getElementById('testimonialsTitle').textContent = 'What Students Say';
        loadTestimonials('student');
        
        // Reset CTA for students
        document.getElementById('ctaTitle').textContent = 'Ready to Start Your Learning Journey?';
        document.getElementById('ctaDescription').textContent = 'Join thousands of students who are already excelling in science and math!';
        
        // Load student subjects
        loadSubjects('student');
    }
}

// 🔧 FIXED: Load subjects based on user type - COMPLETELY DIFFERENT CONTENT
// 🔧 FIXED: Load subjects based on user type - PROPERLY ALIGNED STATS & QUIZ CREATION AT BOTTOM
function loadSubjects(userType) {
    const subjectsGrid = document.getElementById('subjectsGrid');
    
    if (userType === 'teacher') {
        // 🎯 TEACHER VIEW - 4 Subject Analytics Cards + Quiz Creation Section at Bottom
        subjectsGrid.innerHTML = `
            <div class="subject-card analytics-card" style="--subject-color: #10B981;">
                <div class="subject-content">
                    <div class="subject-icon">📊</div>
                    <h3>Mathematics Analytics</h3>
                    <p>Track student performance in algebra, geometry, and calculus with detailed progress insights</p>
                    <div class="analytics-stats">
                        <div class="stat-mini">
                            <span class="stat-value">156</span>
                            <span class="stat-label">Students</span>
                        </div>
                        <div class="stat-mini">
                            <span class="stat-value">82%</span>
                            <span class="stat-label">Avg Score</span>
                        </div>
                    </div>
                </div>
                <div class="subject-button-container">
                    <button class="btn btn--primary btn--subject" onclick="showSubjectAnalytics('mathematics')">View Analytics</button>
                </div>
            </div>

            <div class="subject-card analytics-card" style="--subject-color: #059669;">
                <div class="subject-content">
                    <div class="subject-icon">🔬</div>
                    <h3>Science Analytics</h3>
                    <p>Monitor progress in physics, chemistry, and biology with interactive lab performance data</p>
                    <div class="analytics-stats">
                        <div class="stat-mini">
                            <span class="stat-value">142</span>
                            <span class="stat-label">Students</span>
                        </div>
                        <div class="stat-mini">
                            <span class="stat-value">79%</span>
                            <span class="stat-label">Avg Score</span>
                        </div>
                    </div>
                </div>
                <div class="subject-button-container">
                    <button class="btn btn--primary btn--subject" onclick="showSubjectAnalytics('science')">View Analytics</button>
                </div>
            </div>

            <div class="subject-card analytics-card" style="--subject-color: #047857;">
                <div class="subject-content">
                    <div class="subject-icon">💻</div>
                    <h3>Technology Analytics</h3>
                    <p>Analyze programming assignments and algorithm understanding across all grade levels</p>
                    <div class="analytics-stats">
                        <div class="stat-mini">
                            <span class="stat-value">98</span>
                            <span class="stat-label">Students</span>
                        </div>
                        <div class="stat-mini">
                            <span class="stat-value">85%</span>
                            <span class="stat-label">Avg Score</span>
                        </div>
                    </div>
                </div>
                <div class="subject-button-container">
                    <button class="btn btn--primary btn--subject" onclick="showSubjectAnalytics('technology')">View Analytics</button>
                </div>
            </div>

            <div class="subject-card analytics-card" style="--subject-color: #065f46;">
                <div class="subject-content">
                    <div class="subject-icon">🧠</div>
                    <h3>Engineering Analytics</h3>
                    <p>Evaluate logical reasoning and problem-solving skill development over time</p>
                    <div class="analytics-stats">
                        <div class="stat-mini">
                            <span class="stat-value">67</span>
                            <span class="stat-label">Students</span>
                        </div>
                        <div class="stat-mini">
                            <span class="stat-value">77%</span>
                            <span class="stat-label">Avg Score</span>
                        </div>
                    </div>
                </div>
                <div class="subject-button-container">
                    <button class="btn btn--primary btn--subject" onclick="showSubjectAnalytics('engineering')">View Analytics</button>
                </div>
            </div>

            <!-- Quiz Creation Section at Bottom -->
            <div class="quiz-creation-section" style="grid-column: 1 / -1; margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 15px; text-align: center; color: white;">
                <div class="quiz-creation-content">
                    <div class="quiz-icon" style="font-size: 48px; margin-bottom: 15px;">🎯</div>
                    <h3 style="color: white; margin-bottom: 10px; font-size: 24px;">Quiz Creation Tools</h3>
                    <p style="color: rgba(255,255,255,0.9); margin-bottom: 20px; font-size: 16px;">Create, edit, and manage quizzes with advanced question types and automatic grading</p>
                    <div class="quiz-creation-stats" style="display: flex; justify-content: center; gap: 40px; margin-bottom: 25px;">
                        <div class="stat-mini" style="color: white;">
                            <span class="stat-value" style="color: white; font-size: 28px; font-weight: bold;">47</span>
                            <span class="stat-label" style="color: rgba(255,255,255,0.8);">Created</span>
                        </div>
                        <div class="stat-mini" style="color: white;">
                            <span class="stat-value" style="color: white; font-size: 28px; font-weight: bold;">834</span>
                            <span class="stat-label" style="color: rgba(255,255,255,0.8);">Attempts</span>
                        </div>
                    </div>
                    <button class="btn btn--secondary" style="background: white; color: #10B981; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.3s;" onclick="showQuizCreation()">Create New Quiz</button>
                </div>
            </div>
        `;
    } else {
        // 🎯 STUDENT VIEW - Regular subject cards (no changes needed)
        subjectsGrid.innerHTML = `
            <div class="subject-card" style="--subject-color: #10B981;">
                <div class="subject-content">
                    <div class="subject-icon">📊</div>
                    <h3>Mathematics</h3>
                    <p>Master algebra, geometry, trigonometry, and calculus with interactive problem-solving</p>
                    <div class="subject-topics">
                        <span class="topic-tag">Algebra</span>
                        <span class="topic-tag">Geometry</span>
                        <span class="topic-tag">Trigonometry</span>
                        <span class="topic-tag">Calculus</span>
                        <span class="topic-tag">Probability</span>
                    </div>
                </div>
                <div class="subject-button-container">
                    <button class="btn btn--primary btn--subject" onclick="window.location.href='../4-mathematics/math-fp.html'">Start Learning</button>
                </div>
            </div>

            <div class="subject-card" style="--subject-color: #059669;">
                <div class="subject-content">
                    <div class="subject-icon">🔬</div>
                    <h3>Science</h3>
                    <p>Explore the wonders of physics, chemistry, biology, and environmental science</p>
                    <div class="subject-topics">
                        <span class="topic-tag">Physics</span>
                        <span class="topic-tag">Chemistry</span>
                        <span class="topic-tag">Biology</span>
                        <span class="topic-tag">Environmental Science</span>
                    </div>
                </div>
                <div class="subject-button-container">
                    <button class="btn btn--primary btn--subject" onclick="window.location.href='../1-science/science-fp.html'">Start Learning</button>
                </div>
            </div>

            <div class="subject-card" style="--subject-color: #047857;">
                <div class="subject-content">
                    <div class="subject-icon">💻</div>
                    <h3>Technology</h3>
                    <p>Learn programming, algorithms, data structures, and digital literacy</p>
                    <div class="subject-topics">
                        <span class="topic-tag">Programming</span>
                        <span class="topic-tag">Algorithms</span>
                        <span class="topic-tag">Data Structures</span>
                        <span class="topic-tag">Digital Literacy</span>
                    </div>
                </div>
                <div class="subject-button-container">
                    <button class="btn btn--primary btn--subject" onclick="alert('Engineering games coming soon!')">Start Learning</button>
                </div>
            </div>

            <div class="subject-card" style="--subject-color: #065f46;">
                <div class="subject-content">
                    <div class="subject-icon">🧠</div>
                    <h3>Engineering</h3>
                    <p>Develop logical reasoning, problem-solving, and analytical thinking skills</p>
                    <div class="subject-topics">
                        <span class="topic-tag">Logic</span>
                        <span class="topic-tag">Reasoning</span>
                        <span class="topic-tag">Problem Solving</span>
                        <span class="topic-tag">Analysis</span>
                    </div>
                </div>
                <div class="subject-button-container">
                    <button class="btn btn--primary btn--subject" onclick="window.location.href='../3-engineering/engineering-fp.html'">Start Learning</button>
                </div>
            </div>
        `;
    }
}

// Load testimonials based on user type
function loadTestimonials(userType) {
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    
    if (userType === 'teacher') {
        testimonialsSlider.innerHTML = `
            <div class="testimonial active">
                <div class="testimonial-text">"E-Vidya's analytics helped me identify struggling students early and provide targeted support."</div>
                <div class="testimonial-author">Mrs. Priya Sharma</div>
                <div class="testimonial-class">Mathematics Teacher</div>
            </div>
            <div class="testimonial">
                <div class="testimonial-text">"The detailed performance insights transformed how I approach classroom instruction."</div>
                <div class="testimonial-author">Mr. Rajesh Kumar</div>
                <div class="testimonial-class">Science Teacher</div>
            </div>
            <div class="testimonial">
                <div class="testimonial-text">"Interactive dashboards made parent-teacher conferences much more productive and data-driven."</div>
                <div class="testimonial-author">Dr. Anita Gupta</div>
                <div class="testimonial-class">Principal</div>
            </div>
        `;
    } else {
        testimonialsSlider.innerHTML = `
            <div class="testimonial active">
                <div class="testimonial-text">"E-Vidya made chemistry so much fun! The virtual labs are amazing!"</div>
                <div class="testimonial-author">Priya S.</div>
                <div class="testimonial-class">Class 10</div>
            </div>
            <div class="testimonial">
                <div class="testimonial-text">"Math became my favorite subject after using this platform."</div>
                <div class="testimonial-author">Arjun K.</div>
                <div class="testimonial-class">Class 12</div>
            </div>
            <div class="testimonial">
                <div class="testimonial-text">"The interactive quizzes helped me ace my physics exam!"</div>
                <div class="testimonial-author">Sneha R.</div>
                <div class="testimonial-class">Class 9</div>
            </div>
        `;
    }
}

// Update teacher stats
function updateTeacherStats() {
    const statsGrid = document.getElementById('statsGrid');
    if (currentUser && currentUser.role === 'teacher') {
        statsGrid.innerHTML = `
            <div class="stat-card">
                <div class="stat-number" data-target="156">0</div>
                <div class="stat-label">Active Students</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" data-target="47">0</div>
                <div class="stat-label">Quizzes Created</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" data-target="78">0</div>
                <div class="stat-label">Average Class Score</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" data-target="92">0</div>
                <div class="stat-label">Engagement Rate</div>
            </div>
        `;
        // Re-animate stats
        setTimeout(animateStats, 100);
    }
}

// Animate statistics numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 20);
    });
}

// 🔧 FIXED DASHBOARD FUNCTIONS - Each action now opens different content

// 1. Total Students - Shows ALL students overview
function showTotalStudents() {
    console.log('Opening Total Students Modal...');
    const modal = document.getElementById('studentOverviewModal');
    if (modal) {
        modal.style.display = 'flex';
        loadStudentOverviewData();
    } else {
        console.error('Student Overview Modal not found!');
    }
}

function showActiveStudents() {
    console.log('Opening Active Students Modal...');
    const modal = document.getElementById('studentOverviewModal');
    if (modal) {
        modal.style.display = 'flex';
        loadActiveStudentsData();
    } else {
        console.error('Student Overview Modal not found!');
    }
}

function closeStudentOverview() {
    const modal = document.getElementById('studentOverviewModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function loadStudentOverviewData() {
    const studentsGrid = document.getElementById('studentsGridOverview');
    const studentsLoading = document.getElementById('studentsLoading');
    const studentsEmpty = document.getElementById('studentsEmpty');
    
    // Show loading state
    if (studentsLoading) studentsLoading.style.display = 'flex';
    if (studentsGrid) studentsGrid.innerHTML = '';
    if (studentsEmpty) studentsEmpty.style.display = 'none';
    
    // Enhanced student data with more details
    const allStudents = [
        {
            name: "Aarav Sharma",
            email: "aarav.sharma@email.com",
            class: "10",
            avgScore: "87%",
            lastActive: "Sep 19",
            status: "online",
            avatar: "A",
            quizzesTaken: 15,
            totalQuizzes: 20,
            timeSpent: "45 mins today",
            subjects: ["Math", "Physics", "Chemistry"]
        },
        {
            name: "Priya Patel",
            email: "priya.patel@email.com",
            class: "9",
            avgScore: "92%",
            lastActive: "Sep 19",
            status: "online",
            avatar: "P",
            quizzesTaken: 18,
            totalQuizzes: 20,
            timeSpent: "52 mins today",
            subjects: ["Math", "Biology", "Chemistry"]
        },
        {
            name: "Rohit Kumar",
            email: "rohit.kumar@email.com",
            class: "11",
            avgScore: "78%",
            lastActive: "Sep 17",
            status: "offline",
            avatar: "R",
            quizzesTaken: 12,
            totalQuizzes: 20,
            timeSpent: "23 mins ago",
            subjects: ["Physics", "Math", "Computer"]
        },
        {
            name: "Sneha Reddy",
            email: "sneha.reddy@email.com",
            class: "12",
            avgScore: "95%",
            lastActive: "Sep 19",
            status: "online",
            avatar: "S",
            quizzesTaken: 20,
            totalQuizzes: 20,
            timeSpent: "67 mins today",
            subjects: ["All Subjects"]
        },
        {
            name: "Arjun Singh",
            email: "arjun.singh@email.com",
            class: "8",
            avgScore: "73%",
            lastActive: "Sep 18",
            status: "offline",
            avatar: "A",
            quizzesTaken: 14,
            totalQuizzes: 20,
            timeSpent: "38 mins yesterday",
            subjects: ["Math", "Science"]
        },
        {
            name: "Kavya Iyer",
            email: "kavya.iyer@email.com",
            class: "10",
            avgScore: "88%",
            lastActive: "Sep 19",
            status: "online",
            avatar: "K",
            quizzesTaken: 16,
            totalQuizzes: 20,
            timeSpent: "41 mins today",
            subjects: ["Math", "Physics", "Chemistry"]
        }
    ];
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        if (studentsLoading) studentsLoading.style.display = 'none';
        renderStudentOverview(allStudents, 'All Students');
    }, 1200);
}

function loadActiveStudentsData() {
    const studentsGrid = document.getElementById('studentsGridOverview');
    const studentsLoading = document.getElementById('studentsLoading');
    const studentsEmpty = document.getElementById('studentsEmpty');
    
    // Show loading state
    if (studentsLoading) studentsLoading.style.display = 'flex';
    if (studentsGrid) studentsGrid.innerHTML = '';
    if (studentsEmpty) studentsEmpty.style.display = 'none';
    
    // Filter only active students (online this week)
    const activeStudents = [
        {
            name: "Aarav Sharma",
            email: "aarav.sharma@email.com",
            class: "10",
            avgScore: "87%",
            lastActive: "2 mins ago",
            status: "online",
            avatar: "A",
            quizzesTaken: 15,
            totalQuizzes: 20,
            timeSpent: "45 mins today",
            activityLevel: "Very Active"
        },
        {
            name: "Priya Patel",
            email: "priya.patel@email.com",
            class: "9",
            avgScore: "92%",
            lastActive: "5 mins ago",
            status: "online",
            avatar: "P",
            quizzesTaken: 18,
            totalQuizzes: 20,
            timeSpent: "52 mins today",
            activityLevel: "Very Active"
        },
        {
            name: "Sneha Reddy",
            email: "sneha.reddy@email.com",
            class: "12",
            avgScore: "95%",
            lastActive: "1 min ago",
            status: "online",
            avatar: "S",
            quizzesTaken: 20,
            totalQuizzes: 20,
            timeSpent: "67 mins today",
            activityLevel: "Extremely Active"
        },
        {
            name: "Kavya Iyer",
            email: "kavya.iyer@email.com",
            class: "10",
            avgScore: "88%",
            lastActive: "8 mins ago",
            status: "online",
            avatar: "K",
            quizzesTaken: 16,
            totalQuizzes: 20,
            timeSpent: "41 mins today",
            activityLevel: "Active"
        }
    ];
    
    // Update modal title for active students
    const modalTitle = document.querySelector('.student-overview-header h2');
    if (modalTitle) {
        modalTitle.textContent = 'Active Students This Week';
    }
    
    setTimeout(() => {
        if (studentsLoading) studentsLoading.style.display = 'none';
        renderStudentOverview(activeStudents, 'Active Students');
    }, 1200);
}

function renderStudentOverview(students, type) {
    const studentsGrid = document.getElementById('studentsGridOverview');
    const studentsEmpty = document.getElementById('studentsEmpty');
    
    if (!studentsGrid) return;
    
    if (students.length === 0) {
        if (studentsEmpty) studentsEmpty.style.display = 'block';
        return;
    }
    
    // Update modal title based on type
    const modalTitle = document.querySelector('.student-overview-header h2');
    if (modalTitle) {
        modalTitle.textContent = type === 'Active Students' ? 'Active Students This Week' : 'All Students Overview';
    }
    
    studentsGrid.innerHTML = students.map((student, index) => `
        <div class="student-card-overview" onclick="viewStudentDetails('${student.email}')" style="animation-delay: ${index * 0.1}s">
            <div class="student-card-header">
                <div class="student-avatar-large">${student.avatar}</div>
                <div class="student-info-main">
                    <h3 class="student-name-large">${student.name}</h3>
                    <p class="student-email">${student.email}</p>
                </div>
                <div class="student-status-indicator ${student.status}"></div>
            </div>
            
            <div class="student-details">
                <div class="student-detail">
                    <div class="student-detail-label">Class</div>
                    <div class="student-detail-value class">${student.class}</div>
                </div>
                <div class="student-detail">
                    <div class="student-detail-label">Avg Score</div>
                    <div class="student-detail-value score">${student.avgScore}</div>
                </div>
                <div class="student-detail">
                    <div class="student-detail-label">Last Active</div>
                    <div class="student-detail-value last-active">${student.lastActive}</div>
                </div>
                <div class="student-detail">
                    <div class="student-detail-label">Time Spent</div>
                    <div class="student-detail-value">${student.timeSpent}</div>
                </div>
            </div>
            
            <div class="student-card-footer">
                <div class="student-actions">
                    <button class="student-action-btn" onclick="event.stopPropagation(); sendStudentMessage('${student.email}', '${student.name}')">
                        📧 Message
                    </button>
                    <button class="student-action-btn" onclick="event.stopPropagation(); viewStudentProgress('${student.email}', '${student.name}')">
                        📊 Progress
                    </button>
                </div>
                <div class="student-progress-indicator">
                    ${Math.round((student.quizzesTaken / student.totalQuizzes) * 100)}% Complete
                </div>
            </div>
        </div>
    `).join('');
    
    // Add staggered animation
    const cards = studentsGrid.querySelectorAll('.student-card-overview');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function filterOverviewStudents() {
    const searchTerm = document.getElementById('studentOverviewSearchInput').value.toLowerCase();
    const studentCards = document.querySelectorAll('.student-card-overview');
    let visibleCount = 0;
    
    studentCards.forEach(card => {
        const name = card.querySelector('.student-name-large').textContent.toLowerCase();
        const email = card.querySelector('.student-email').textContent.toLowerCase();
        const classValue = card.querySelector('.student-detail-value.class').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || email.includes(searchTerm) || classValue.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show empty state if no results
    const studentsEmpty = document.getElementById('studentsEmpty');
    if (studentsEmpty) {
        if (visibleCount === 0 && searchTerm.length > 0) {
            studentsEmpty.style.display = 'block';
            studentsEmpty.innerHTML = `
                <h3>No students found</h3>
                <p>No students match "${searchTerm}". Try a different search term.</p>
            `;
        } else {
            studentsEmpty.style.display = 'none';
        }
    }
}

function sendStudentMessage(email, name) {
    console.log(`Opening message dialog for ${name} (${email})`);
    
    // Show a nice notification
    showNotification(`📧 Opening message for ${name}`, 'info');
    
    // Here you would typically open a messaging modal
    // For now, we'll just show a simple notification
    setTimeout(() => {
        showNotification(`Message sent to ${name}!`, 'success');
    }, 1000);
}

function viewStudentProgress(email, name) {
    console.log(`Viewing progress for ${name} (${email})`);
    
    // Show loading notification
    showNotification(`📊 Loading progress for ${name}...`, 'info');
    
    // Here you would typically open a progress modal with charts
    setTimeout(() => {
        showNotification(`Progress report ready for ${name}!`, 'success');
    }, 1500);
}

function viewStudentDetails(email) {
    console.log(`Viewing detailed profile for student: ${email}`);
    
    // Show notification
    showNotification(`👤 Loading student profile...`, 'info');
    
    // Here you would open a detailed student profile modal
    setTimeout(() => {
        showNotification(`Student profile loaded!`, 'success');
    }, 1000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('notification-show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add this to your DOMContentLoaded event listener or create a new one
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('studentOverviewModal');
        if (event.target === modal) {
            closeStudentOverview();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('studentOverviewModal');
            if (modal && modal.style.display === 'flex') {
                closeStudentOverview();
            }
        }
    });
});

// 2. Quizzes Created - Shows quiz creation and management dashboard
function showCreatedQuizzes() {
    document.getElementById('profileMenu').style.display = 'none';
    document.querySelector('.profile-dropdown').classList.remove('active');
    
    // Show quiz management modal with creation focus
    updateQuizList('created'); // Show created quizzes with creation stats
    
    // Update modal title and add creation stats
    const modal = document.getElementById('quizManagementModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.textContent = 'Quiz Creation Dashboard';
    
    if (modal) {
        modal.classList.add('active');
    }
}

// 3. Average Class Score - Shows detailed score breakdown and analysis
function showClassScoreBreakdown() {
    document.getElementById('profileMenu').style.display = 'none';
    document.querySelector('.profile-dropdown').classList.remove('active');
    
    // Show score analysis modal with detailed breakdown
    const modal = document.getElementById('classPerformanceModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.textContent = 'Class Score Analysis & Breakdown';
    
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => {
            // Create score-focused charts
            createScoreDistributionChart();
            createGradePerformanceChart();
            createEngagementChart();
            createWeeklyProgressChart();
        }, 200);
    }
}

// 4. Active This Week - Shows only students active in the last 7 days
function showActiveStudents() {
    document.getElementById('profileMenu').style.display = 'none';
    document.querySelector('.profile-dropdown').classList.remove('active');
    
    // Show filtered student list with only active students
    updateStudentList(true, 'active'); // Show only active students
    
    // Update modal title to reflect active students focus
    const modal = document.getElementById('studentListModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.textContent = 'Students Active This Week';
    
    if (modal) {
        modal.classList.add('active');
    }
}

// 5. Student Analytics - Shows comprehensive student performance analytics
function showStudentAnalytics() {
    document.getElementById('profileMenu').style.display = 'none';
    document.querySelector('.profile-dropdown').classList.remove('active');
    
    // Populate student filter
    const studentFilter = document.getElementById('studentFilter');
    studentFilter.innerHTML = '<option value="all">All Students</option>' +
        mockStudentData.map(student => 
            `<option value="${student.id}">${student.name}</option>`
        ).join('');
    
    // Show analytics modal with comprehensive data
    const modal = document.getElementById('studentAnalyticsModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.textContent = 'Comprehensive Student Analytics';
    
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => {
            createPerformanceChart();
            createSubjectScoresChart();
            updateStudentAnalyticsTable();
        }, 200);
    }
}

// 6. Class Performance - Shows overall class trends and comparisons
function showClassPerformance() {
    document.getElementById('profileMenu').style.display = 'none';
    document.querySelector('.profile-dropdown').classList.remove('active');
    
    const modal = document.getElementById('classPerformanceModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.textContent = 'Class Performance Trends & Comparisons';
    
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => {
            createGradePerformanceChart();
            createEngagementChart();
            createWeeklyProgressChart();
            createScoreDistributionChart();
        }, 200);
    }
}

// 7. Student Directory - Shows student contact info and profiles
function showStudentList() {
    document.getElementById('profileMenu').style.display = 'none';
    document.querySelector('.profile-dropdown').classList.remove('active');
    
    // Show student directory with contact focus
    updateStudentList(false, 'directory'); // Show directory view with contact info
    
    const modal = document.getElementById('studentListModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.textContent = 'Student Directory & Profiles';
    
    if (modal) {
        modal.classList.add('active');
    }
}

// 8. Quiz Management - Shows quiz editing and management tools
function showQuizManagement() {
    document.getElementById('profileMenu').style.display = 'none';
    document.querySelector('.profile-dropdown').classList.remove('active');
    
    // Show quiz management with editing focus
    updateQuizList('management'); // Show management view with editing tools
    
    const modal = document.getElementById('quizManagementModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    modalTitle.textContent = 'Quiz Management & Editing Tools';
    
    if (modal) {
        modal.classList.add('active');
    }
}

// Enhanced theme integration for modals
function initializeModalTheme() {
    // Apply theme colors to modal elements
    const modal = document.getElementById('studentOverviewModal');
    if (modal) {
        // Set CSS custom properties for consistency
        modal.style.setProperty('--modal-primary', 'var(--primary-green)');
        modal.style.setProperty('--modal-secondary', 'var(--secondary-green)');
    }
}

// Enhanced error handling
function handleModalError(error, context) {
    console.error(`Modal Error in ${context}:`, error);
    showNotification(`❌ Something went wrong. Please try again.`, 'error');
}

// Better loading states
function showModalLoading(show = true) {
    const loadingElement = document.getElementById('studentsLoading');
    if (loadingElement) {
        loadingElement.style.display = show ? 'flex' : 'none';
        if (show) {
            loadingElement.innerHTML = `
                <div class="loading-spinner-enhanced"></div>
                <p>Loading students...</p>
            `;
        }
    }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    
    initializeModalTheme();
});

// 🎯 NEW: Quiz Creation Function (Teacher-only)
function showQuizCreation() {
    alert('🎉 Quiz Creation Wizard\n\n✅ Create Multiple Choice Questions\n✅ Add Images & Explanations\n✅ Set Difficulty Levels\n✅ Auto-Grade & Instant Feedback\n✅ Detailed Analytics\n\nComing Soon! This will open a comprehensive quiz builder.');
}

// Chart creation functions - Fixed to ensure they work properly
function createPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (performanceChart) {
        performanceChart.destroy();
    }
    
    try {
        performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
                datasets: [{
                    label: 'Class Average',
                    data: [72, 75, 78, 80, 82, 81, 85],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Top Performer',
                    data: [88, 90, 92, 94, 95, 93, 96],
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Student Performance Over Time'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating performance chart:', error);
        ctx.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Chart loading failed. Please refresh the page.</div>';
    }
}

function createSubjectScoresChart() {
    const ctx = document.getElementById('subjectScoresChart');
    if (!ctx) return;
    
    if (subjectScoresChart) {
        subjectScoresChart.destroy();
    }
    
    try {
        subjectScoresChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Mathematics', 'Science', 'Technology', 'Engineering'],
                datasets: [{
                    label: 'Class Average',
                    data: [82, 79, 85, 77],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    pointBackgroundColor: '#10B981'
                }, {
                    label: 'Previous Month',
                    data: [78, 76, 82, 74],
                    borderColor: '#6B7280',
                    backgroundColor: 'rgba(107, 114, 128, 0.1)',
                    pointBackgroundColor: '#6B7280'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating subject scores chart:', error);
        ctx.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Chart loading failed. Please refresh the page.</div>';
    }
}

function createScoreDistributionChart() {
    const ctx = document.getElementById('scoreDistributionChart');
    if (!ctx) return;
    
    if (scoreDistributionChart) {
        scoreDistributionChart.destroy();
    }
    
    try {
        scoreDistributionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['90-100%', '80-89%', '70-79%', '60-69%', '< 60%'],
                datasets: [{
                    label: 'Number of Students',
                    data: [43, 78, 25, 8, 2],
                    backgroundColor: [
                        '#10B981',
                        '#22C55E', 
                        '#EAB308',
                        '#F97316',
                        '#EF4444'
                    ],
                    borderColor: [
                        '#059669',
                        '#16A34A',
                        '#CA8A04',
                        '#EA580C',
                        '#DC2626'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Score Distribution Across All Students'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating score distribution chart:', error);
        ctx.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Chart loading failed. Please refresh the page.</div>';
    }
}

function createGradePerformanceChart() {
    const ctx = document.getElementById('gradePerformanceChart');
    if (!ctx) return;
    
    if (gradePerformanceChart) {
        gradePerformanceChart.destroy();
    }
    
    try {
        gradePerformanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
                datasets: [{
                    label: 'Average Score',
                    data: [78, 79, 81, 83, 85, 82, 87],
                    backgroundColor: '#10B981',
                    borderColor: '#059669',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating grade performance chart:', error);
        ctx.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Chart loading failed. Please refresh the page.</div>';
    }
}

function createEngagementChart() {
    const ctx = document.getElementById('engagementChart');
    if (!ctx) return;
    
    if (engagementChart) {
        engagementChart.destroy();
    }
    
    try {
        engagementChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Very Active', 'Active', 'Moderate', 'Low Activity'],
                datasets: [{
                    label: 'Student Engagement',
                    data: [45, 67, 32, 12],
                    backgroundColor: [
                        '#10B981',
                        '#22C55E',
                        '#EAB308',
                        '#EF4444'
                    ],
                    borderColor: [
                        '#059669',
                        '#16A34A',
                        '#CA8A04',
                        '#DC2626'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Student Engagement Levels'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating engagement chart:', error);
        ctx.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Chart loading failed. Please refresh the page.</div>';
    }
}

function createWeeklyProgressChart() {
    const ctx = document.getElementById('weeklyProgressChart');
    if (!ctx) return;
    
    if (weeklyProgressChart) {
        weeklyProgressChart.destroy();
    }
    
    try {
        weeklyProgressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Quiz Completions',
                    data: [23, 34, 28, 45, 52, 38, 29],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Study Hours',
                    data: [12, 18, 15, 22, 28, 20, 16],
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Weekly Activity Pattern'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating weekly progress chart:', error);
        ctx.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Chart loading failed. Please refresh the page.</div>';
    }
}

// Update analytics filters
function updateAnalyticsFilters() {
    const studentFilter = document.getElementById('studentFilter').value;
    const subjectFilter = document.getElementById('subjectFilterAnalytics').value;
    const timeRange = document.getElementById('timeRangeFilter').value;
    const classFilter = document.getElementById('classFilter').value;
    
    console.log('Filters updated:', { studentFilter, subjectFilter, timeRange, classFilter });
    updateStudentAnalyticsTable();
}

// Update analytics table
function updateStudentAnalyticsTable() {
    const tableContainer = document.getElementById('studentAnalyticsTable');
    const table = `
        <div class="analytics-table">
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Avg Score</th>
                        <th>Quizzes Taken</th>
                        <th>Last Active</th>
                        <th>Improvement</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${mockStudentData.map(student => `
                        <tr>
                            <td><strong>${student.name}</strong></td>
                            <td>Class ${student.class}</td>
                            <td><span class="score-badge ${getScoreClass(student.averageScore)}">${student.averageScore}%</span></td>
                            <td>${student.totalQuizzes}</td>
                            <td>${formatDate(student.lastActive)}</td>
                            <td><span class="improvement ${student.improvement.startsWith('+') ? 'positive' : 'negative'}">${student.improvement}</span></td>
                            <td><button class="btn btn--sm btn--outline" onclick="viewStudentDetail(${student.id})">View Details</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    tableContainer.innerHTML = table;
}

// 🔧 FIXED STUDENT LIST - Clean display without award clutter
function updateStudentList(activeOnly = false, viewType = 'default') {
    const studentsGrid = document.getElementById('studentsGrid');
    let studentsToShow = mockStudentData;
    
    if (activeOnly) {
        // Filter to show only students active this week
        studentsToShow = mockStudentData.filter(student => {
            const lastActive = new Date(student.lastActive);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return lastActive >= oneWeekAgo;
        });
    }
    
    // Clean display without award clutter
    studentsGrid.innerHTML = studentsToShow.map(student => `
        <div class="student-card">
            <div class="student-avatar">
                <span>${student.avatar}</span>
            </div>
            <div class="student-info">
                <h4>${student.name}</h4>
                <p>📧 ${student.email}</p>
                <p>🎓 Class ${student.class} • 📊 Avg Score: ${student.averageScore}%</p>
                <p>🕒 Last Active: ${formatDate(student.lastActive)}</p>
            </div>
            <div class="student-stats">
                <div class="stat-mini">
                    <span class="stat-value">${student.totalQuizzes}</span>
                    <span class="stat-label">Quizzes</span>
                </div>
                <div class="stat-mini">
                    <span class="stat-value">${student.timeSpent}h</span>
                    <span class="stat-label">Study Time</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Enhanced quiz list with different views
function updateQuizList(viewType = 'default') {
    const quizList = document.getElementById('quizList');
    
    if (viewType === 'created') {
        // Creation dashboard view
        quizList.innerHTML = `
            <div class="quiz-creation-stats" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                <div class="stat-mini">
                    <span class="stat-value">47</span>
                    <span class="stat-label">Total Created</span>
                </div>
                <div class="stat-mini">
                    <span class="stat-value">12</span>
                    <span class="stat-label">This Month</span>
                </div>
                <div class="stat-mini">
                    <span class="stat-value">834</span>
                    <span class="stat-label">Total Attempts</span>
                </div>
            </div>
            ${mockQuizData.map(quiz => `
                <div class="quiz-card">
                    <div class="quiz-info">
                        <h4>${quiz.title}</h4>
                        <p>📚 ${quiz.subject} • 🎓 Class ${quiz.class}</p>
                        <p>📅 Created: ${formatDate(quiz.createdDate)} • 👥 ${quiz.totalAttempts} attempts</p>
                    </div>
                    <div class="quiz-stats">
                        <div class="stat-mini">
                            <span class="stat-value">${quiz.averageScore}%</span>
                            <span class="stat-label">Avg Score</span>
                        </div>
                        <div class="difficulty-badge ${quiz.difficulty.toLowerCase()}">${quiz.difficulty}</div>
                    </div>
                    <div class="quiz-actions">
                        <button class="btn btn--sm btn--primary" onclick="duplicateQuiz(${quiz.id})">Duplicate</button>
                        <button class="btn btn--sm btn--outline" onclick="viewCreationStats(${quiz.id})">Stats</button>
                    </div>
                </div>
            `).join('')}
        `;
    } else {
        // Management view - focus on editing
        quizList.innerHTML = mockQuizData.map(quiz => `
            <div class="quiz-card">
                <div class="quiz-info">
                    <h4>${quiz.title}</h4>
                    <p>📚 ${quiz.subject} • 🎓 Class ${quiz.class}</p>
                    <p>📅 Created: ${formatDate(quiz.createdDate)} • 🔄 Last attempt: ${formatDate(quiz.lastAttempt)}</p>
                </div>
                <div class="quiz-stats">
                    <div class="stat-mini">
                        <span class="stat-value">${quiz.averageScore}%</span>
                        <span class="stat-label">Avg Score</span>
                    </div>
                    <div class="difficulty-badge ${quiz.difficulty.toLowerCase()}">${quiz.difficulty}</div>
                </div>
                <div class="quiz-actions">
                    <button class="btn btn--sm btn--primary" onclick="editQuiz(${quiz.id})">Edit</button>
                    <button class="btn btn--sm btn--outline" onclick="viewQuizResults(${quiz.id})">Results</button>
                </div>
            </div>
        `).join('');
    }
}

// Utility functions
function getScoreClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'needs-improvement';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
}

function filterStudents() {
    const searchTerm = document.getElementById('studentSearchInput').value.toLowerCase();
    const studentCards = document.querySelectorAll('.student-card');
    
    studentCards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const email = card.querySelector('p').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || email.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal close functions
function closeStudentAnalyticsModal() {
    document.getElementById('studentAnalyticsModal').classList.remove('active');
    if (performanceChart) performanceChart.destroy();
    if (subjectScoresChart) subjectScoresChart.destroy();
}

function closeClassPerformanceModal() {
    document.getElementById('classPerformanceModal').classList.remove('active');
    if (scoreDistributionChart) scoreDistributionChart.destroy();
    if (gradePerformanceChart) gradePerformanceChart.destroy();
    if (engagementChart) engagementChart.destroy();
    if (weeklyProgressChart) weeklyProgressChart.destroy();
}

function closeStudentListModal() {
    document.getElementById('studentListModal').classList.remove('active');
}

function closeQuizManagementModal() {
    document.getElementById('quizManagementModal').classList.remove('active');
}

// Enhanced placeholder functions
function showSubjectAnalytics(subject) {
    alert(`📊 ${subject.charAt(0).toUpperCase() + subject.slice(1)} Analytics Dashboard\n\n✅ Student Progress Tracking\n✅ Performance Trends\n✅ Topic-wise Analysis\n✅ Engagement Metrics\n\nComing Soon!`);
}

function viewStudentDetail(studentId) {
    const student = mockStudentData.find(s => s.id === studentId);
    alert(`👤 Detailed Analytics for ${student.name}\n\n✅ Individual Progress Report\n✅ Subject-wise Performance\n✅ Learning Patterns\n✅ Improvement Suggestions\n\nComing Soon!`);
}

function createNewQuiz() {
    alert('🎯 Interactive Quiz Creator\n\n✅ Drag & Drop Question Builder\n✅ Multiple Question Types\n✅ Auto-Grading System\n✅ Instant Analytics\n\nComing Soon!');
}

function importQuiz() {
    alert('📂 Bulk Quiz Import\n\n✅ CSV/Excel Import\n✅ Question Bank Integration\n✅ Batch Processing\n✅ Format Validation\n\nComing Soon!');
}

function editQuiz(quizId) {
    alert('✏️ Quiz Editor\n\n✅ Visual Question Editor\n✅ Real-time Preview\n✅ Version Control\n✅ Collaborative Editing\n\nComing Soon!');
}

function viewQuizResults(quizId) {
    alert('📈 Quiz Results Analysis\n\n✅ Student-wise Breakdown\n✅ Question Difficulty Analysis\n✅ Time Spent Reports\n✅ Performance Trends\n\nComing Soon!');
}

function duplicateQuiz(quizId) {
    alert('📋 Quiz Duplication\n\n✅ One-click Duplication\n✅ Customize for Different Classes\n✅ Modify Questions\n✅ Bulk Operations\n\nComing Soon!');
}

function viewCreationStats(quizId) {
    alert('📊 Quiz Creation Statistics\n\n✅ Creation Timeline\n✅ Student Engagement\n✅ Performance Metrics\n✅ Improvement Areas\n\nComing Soon!');
}

// Continue with existing functions...
function handleSuccessfulLogin(userData) {
    currentUser = {
        name: userData.name || 'User',
        email: userData.email,
        role: userData.role || currentAuthType,
        class: userData.class || null,
        school: userData.school || '',
        phone: userData.phone || '',
        subjects: userData.subjects || '',
        preferences: userData.preferences || [],
        avatar: userData.avatar || '🐰',
        quizHistory: userData.role === 'teacher' ? [] : mockQuizHistory,
        achievements: userData.role === 'teacher' ? [] : achievements
    };
    
    localStorage.setItem('evidya_user', JSON.stringify(currentUser));
    updateUserInterface();
    updatePageForUserType();
    closeAuthModal();
}

function updateUserInterface() {
    if (!currentUser) return;
    
    const loginSection = document.getElementById('loginSection');
    const profileSection = document.getElementById('profileSection');
    
    if (loginSection && profileSection) {
        loginSection.style.display = 'none';
        profileSection.style.display = 'block';
        
        const userInitials = document.getElementById('userInitials');
        const userName = document.getElementById('userName');
        const userRole = document.getElementById('userRole');
        
        if (userInitials) userInitials.textContent = currentUser.avatar || '🐰';
        if (userName) userName.textContent = currentUser.name.split(' ')[0];
        if (userRole) {
            userRole.textContent = currentUser.role === 'teacher' ? '👩‍🏫' : '🎓';
            userRole.style.display = 'inline';
        }
        
        const userInitialsLarge = document.getElementById('userInitialsLarge');
        const userNameLarge = document.getElementById('userNameLarge');
        const userClassOrSchool = document.getElementById('userClassOrSchool');
        const roleBadge = document.getElementById('roleBadge');
        
        if (userInitialsLarge) userInitialsLarge.textContent = currentUser.avatar || '🐰';
        if (userNameLarge) userNameLarge.textContent = currentUser.name;
        if (userClassOrSchool) {
            userClassOrSchool.textContent = currentUser.role === 'teacher' 
                ? currentUser.school || 'Teacher' 
                : `Class ${currentUser.class}`;
        }
        if (roleBadge) {
            roleBadge.textContent = currentUser.role === 'teacher' ? 'Teacher' : 'Student';
            roleBadge.className = `role-badge ${currentUser.role}`;
        }
        
        updateProfileMenuItems();
    }
}

function updateProfileMenuItems() {
    const profileMenuItems = document.getElementById('profileMenuItems');
    
    if (currentUser.role === 'teacher') {
        profileMenuItems.innerHTML = `
            <a href="#" onclick="showProfileModal()" class="menu-item">
                <span class="menu-icon">👤</span>
                Edit Profile
            </a>
            <a href="#" onclick="showStudentAnalytics()" class="menu-item">
                <span class="menu-icon">📊</span>
                Student Analytics
            </a>
            <a href="#" onclick="showClassPerformance()" class="menu-item">
                <span class="menu-icon">📈</span>
                Class Performance
            </a>
            <a href="#" onclick="showQuizManagement()" class="menu-item">
                <span class="menu-icon">🎯</span>
                Quiz Management
            </a>
            <a href="#" onclick="showStudentList()" class="menu-item">
                <span class="menu-icon">👥</span>
                Student Directory
            </a>
            <div class="menu-divider"></div>
            <a href="#" onclick="logout()" class="menu-item logout-item">
                <span class="menu-icon">🚪</span>
                Logout
            </a>
        `;
    } else {
        profileMenuItems.innerHTML = `
            <a href="#" onclick="showProfileModal()" class="menu-item">
                <span class="menu-icon">👤</span>
                Edit Profile
            </a>
            <a href="#" onclick="showQuizHistoryModal()" class="menu-item">
                <span class="menu-icon">📊</span>
                Quiz History
            </a>
            <a href="#" onclick="showAchievementsModal()" class="menu-item">
                <span class="menu-icon">🏆</span>
                Achievements
            </a>
            <div class="menu-divider"></div>
            <a href="#" onclick="logout()" class="menu-item logout-item">
                <span class="menu-icon">🚪</span>
                Logout
            </a>
        `;
    }
}

// Auth and form functions
function showAuthModal(type) {
    currentAuthType = type;
    const modal = document.getElementById('authModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (modal && modalTitle) {
        modalTitle.textContent = type === 'student' ? 'Student Login' : 'Teacher Login';
        modal.classList.add('active');
        updateAuthForm();
        switchAuthTab('login');
    }
}

function updateAuthForm() {
    const classGroup = document.getElementById('classGroupStudent');
    const schoolGroup = document.getElementById('schoolGroupTeacher');
    const avatarGroup = document.getElementById('avatarGroupStudent');
    
    if (currentAuthType === 'teacher') {
        classGroup.style.display = 'none';
        schoolGroup.style.display = 'block';
        avatarGroup.style.display = 'none';
        schoolGroup.querySelector('#registerSchool').required = true;
        classGroup.querySelector('#registerClass').required = false;
    } else {
        classGroup.style.display = 'block';
        schoolGroup.style.display = 'none';
        avatarGroup.style.display = 'block';
        classGroup.querySelector('#registerClass').required = true;
        schoolGroup.querySelector('#registerSchool').required = false;
        selectAvatar('🐰');
    }
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    const dropdown = document.querySelector('.profile-dropdown');
    
    if (menu && dropdown) {
        if (menu.style.display === 'none' || !menu.style.display) {
            menu.style.display = 'block';
            dropdown.classList.add('active');
        } else {
            menu.style.display = 'none';
            dropdown.classList.remove('active');
        }
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function switchAuthTab(mode) {
    currentAuthMode = mode;
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('active'));
    
    if (mode === 'login') {
        const loginTab = document.querySelector('[onclick="switchAuthTab(\'login\')"]');
        const loginForm = document.getElementById('loginForm');
        if (loginTab) loginTab.classList.add('active');
        if (loginForm) loginForm.classList.add('active');
    } else {
        const registerTab = document.querySelector('[onclick="switchAuthTab(\'register\')"]');
        const registerForm = document.getElementById('registerForm');
        if (registerTab) registerTab.classList.add('active');
        if (registerForm) registerForm.classList.add('active');
        updateAuthForm();
    }
    
    const modalTitle = document.getElementById('modalTitle');
    const typeText = currentAuthType === 'student' ? 'Student' : 'Teacher';
    const modeText = mode === 'login' ? 'Login' : 'Registration';
    if (modalTitle) {
        modalTitle.textContent = `${typeText} ${modeText}`;
    }
}

function nextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }
}

function prevTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }
}

// 🎯 FIXED: Navigate to subject - different behavior for teachers vs students
function navigateToSubject(subject) {
  if (currentUser && currentUser.role === 'teacher') {
    showSubjectAnalytics(subject);
    return;
  }

  // Show loading
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('active');
  }

  setTimeout(() => {
    // Hide loading first
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
    }
    
    if (subject === 'math') {
      window.location.href = '4-mathematics/math-fp.html';
    } else if (subject == 'science') {
        window.location.href = '1-science/science-fp.html';
    } else if (subject == 'engineering') {
        window.location.href = '3-engineering/engineering-fp.html';
    } else {
      alert(`${subject} section coming soon!`);
    }
  }, 500);
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleMobileMenu() {
    console.log('Mobile menu toggled');
}

// Student modal functions
function showProfileModal() {
    const profileMenu = document.getElementById('profileMenu');
    const dropdown = document.querySelector('.profile-dropdown');
    
    if (profileMenu) profileMenu.style.display = 'none';
    if (dropdown) dropdown.classList.remove('active');
    
    updateProfileForm();
    
    if (currentUser) {
        populateProfileForm();
    }
    
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.classList.add('active');
    }
}

function updateProfileForm() {
    const classGroup = document.getElementById('profileClassGroup');
    const schoolGroup = document.getElementById('profileSchoolGroup');
    const subjectGroup = document.getElementById('profileSubjectGroup');
    const preferencesGroup = document.getElementById('profilePreferencesGroup');
    const avatarGroup = document.getElementById('profileAvatarGroup');
    
    if (currentUser && currentUser.role === 'teacher') {
        classGroup.style.display = 'none';
        schoolGroup.style.display = 'block';
        subjectGroup.style.display = 'block';
        preferencesGroup.style.display = 'none';
        avatarGroup.style.display = 'none';
    } else {
        classGroup.style.display = 'block';
        schoolGroup.style.display = 'none';
        subjectGroup.style.display = 'none';
        preferencesGroup.style.display = 'block';
        avatarGroup.style.display = 'block';
    }
}

function populateProfileForm() {
    const profileName = document.getElementById('profileName');
    const profileClass = document.getElementById('profileClass');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    const profileSchoolName = document.getElementById('profileSchoolName');
    const profileSubjects = document.getElementById('profileSubjects');
    
    if (profileName) profileName.value = currentUser.name;
    if (profileClass && currentUser.class) profileClass.value = currentUser.class;
    if (profileEmail) profileEmail.value = currentUser.email;
    if (profilePhone) profilePhone.value = currentUser.phone || '';
    if (profileSchoolName) profileSchoolName.value = currentUser.school || '';
    if (profileSubjects) profileSubjects.value = currentUser.subjects || '';
    
    if (currentUser.role !== 'teacher') {
        const currentAvatar = currentUser.avatar || '🐰';
        document.getElementById('selectedProfileAvatar').value = currentAvatar;
        selectProfileAvatar(currentAvatar);
        
        const checkboxes = document.querySelectorAll('input[name="preferences"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = currentUser.preferences.includes(checkbox.value);
        });
    }
}

function closeProfileModal() {
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.classList.remove('active');
    }
}

function showQuizHistoryModal() {
    const profileMenu = document.getElementById('profileMenu');
    const dropdown = document.querySelector('.profile-dropdown');
    
    if (profileMenu) profileMenu.style.display = 'none';
    if (dropdown) dropdown.classList.remove('active');
    
    updateQuizHistoryDisplay();
    const quizHistoryModal = document.getElementById('quizHistoryModal');
    if (quizHistoryModal) {
        quizHistoryModal.classList.add('active');
    }
}

function closeQuizHistoryModal() {
    const quizHistoryModal = document.getElementById('quizHistoryModal');
    if (quizHistoryModal) {
        quizHistoryModal.classList.remove('active');
    }
}

function updateQuizHistoryDisplay() {
    if (!currentUser || !currentUser.quizHistory || currentUser.role === 'teacher') return;
    
    const quizzes = currentUser.quizHistory;
    
    const totalQuizzesStudent = document.getElementById('totalQuizzesStudent');
    const averageScoreStudent = document.getElementById('averageScoreStudent');
    const bestScoreStudent = document.getElementById('bestScoreStudent');
    const totalPointsStudent = document.getElementById('totalPointsStudent');
    
    if (totalQuizzesStudent) totalQuizzesStudent.textContent = quizzes.length;
    
    const avgScore = quizzes.reduce((sum, quiz) => sum + quiz.score, 0) / quizzes.length;
    if (averageScoreStudent) averageScoreStudent.textContent = Math.round(avgScore) + '%';
    
    const maxScore = Math.max(...quizzes.map(quiz => quiz.score));
    if (bestScoreStudent) bestScoreStudent.textContent = maxScore + '%';
    
    const sumPoints = quizzes.reduce((sum, quiz) => sum + quiz.points, 0);
    if (totalPointsStudent) totalPointsStudent.textContent = sumPoints.toLocaleString();
    
    const historyList = document.getElementById('quizHistoryList');
    if (historyList) {
        historyList.innerHTML = quizzes.map(quiz => `
            <div class="quiz-item">
                <div class="quiz-info">
                    <div class="quiz-title">${quiz.subject} - ${quiz.topic}</div>
                    <div class="quiz-meta">
                        Class ${quiz.class} • ${quiz.totalQuestions} questions • ${quiz.date} • ${quiz.timeSpent} min
                    </div>
                </div>
                <div class="quiz-score">
                    <div class="score-percentage">${quiz.score}%</div>
                    <div class="score-points">${quiz.points} pts</div>
                </div>
            </div>
        `).join('');
    }
}

function showAchievementsModal() {
    const profileMenu = document.getElementById('profileMenu');
    const dropdown = document.querySelector('.profile-dropdown');
    
    if (profileMenu) profileMenu.style.display = 'none';
    if (dropdown) dropdown.classList.remove('active');
    
    updateAchievementsDisplay();
    const achievementsModal = document.getElementById('achievementsModal');
    if (achievementsModal) {
        achievementsModal.classList.add('active');
    }
}

function closeAchievementsModal() {
    const achievementsModal = document.getElementById('achievementsModal');
    if (achievementsModal) {
        achievementsModal.classList.remove('active');
    }
}

function updateAchievementsDisplay() {
    if (!currentUser || currentUser.role === 'teacher') return;
    
    const achievementsGrid = document.getElementById('achievementsGrid');
    if (achievementsGrid) {
        achievementsGrid.innerHTML = achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.unlocked ? achievement.icon : '🔒'}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `).join('');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('evidya_user');
    
    const loginSection = document.getElementById('loginSection');
    const profileSection = document.getElementById('profileSection');
    const profileMenu = document.getElementById('profileMenu');
    const dropdown = document.querySelector('.profile-dropdown');
    
    if (loginSection) loginSection.style.display = 'block';
    if (profileSection) profileSection.style.display = 'none';
    if (profileMenu) profileMenu.style.display = 'none';
    if (dropdown) dropdown.classList.remove('active');
    
    updatePageForUserType('student');
    alert('You have been logged out successfully.');
}

function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

// Trophy Race mini-game for teachers
function initRace() {
  const canvas = document.getElementById('raceCanvas');
  const ctx = canvas.getContext('2d');
  const lanes = ['🐰','🐱','🐶','🐼'];
  const positions = [0,0,0,0];
  const finish = canvas.width - 30;
  let running = false;

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    lanes.forEach((icon,i) => {
      ctx.font = '24px serif';
      ctx.fillText(icon, positions[i], 30 + i*25);
      ctx.fillText('🏁', finish, 30 + i*25);
    });
  }

  function step() {
    if (!running) return;
    for (let i=0;i<positions.length;i++) {
      positions[i] += Math.random()*5;
      if (positions[i]>=finish-10) {
        running=false;
        alert(`${lanes[i]} wins the race!`);
        break;
      }
    }
    draw();
    if (running) requestAnimationFrame(step);
  }

  document.getElementById('startRace').onclick = () => {
    if (running) return;
    positions.fill(0);
    running=true;
    step();
  };

  draw();
}
document.addEventListener('DOMContentLoaded', initRace);

// Vertical Trophy Race Class
class VerticalTrophyRace {
    constructor() {
        this.racers = [
            {id: 1, name: "Speedy", avatar: "🐰", color: "#FF6B6B", wins: 3, position: 0},
            {id: 2, name: "Flash", avatar: "⚡", color: "#4ECDC4", wins: 1, position: 0},
            {id: 3, name: "Rocket", avatar: "🚀", color: "#45B7D1", wins: 2, position: 0},
            {id: 4, name: "Thunder", avatar: "🌩️", color: "#96CEB4", wins: 0, position: 0},
            {id: 5, name: "Blaze", avatar: "🔥", color: "#FECA57", wins: 1, position: 0}
        ];
        
        this.allPossibleRacers = [
            {id: 1, name: "Speedy", avatar: "🐰", color: "#FF6B6B", wins: 3, position: 0},
            {id: 2, name: "Flash", avatar: "⚡", color: "#4ECDC4", wins: 1, position: 0},
            {id: 3, name: "Rocket", avatar: "🚀", color: "#45B7D1", wins: 2, position: 0},
            {id: 4, name: "Thunder", avatar: "🌩️", color: "#96CEB4", wins: 0, position: 0},
            {id: 5, name: "Blaze", avatar: "🔥", color: "#FECA57", wins: 1, position: 0},
            {id: 6, name: "Turbo", avatar: "🏎️", color: "#E74C3C", wins: 0, position: 0},
            {id: 7, name: "Dash", avatar: "💨", color: "#9B59B6", wins: 0, position: 0},
            {id: 8, name: "Zoom", avatar: "🌪️", color: "#F39C12", wins: 0, position: 0},
            {id: 9, name: "Swift", avatar: "🦅", color: "#1ABC9C", wins: 0, position: 0},
            {id: 10, name: "Bolt", avatar: "⚡", color: "#3498DB", wins: 0, position: 0}
        ];
        
        this.isRacing = false;
        this.raceSpeed = 1;
        this.currentRaceType = "classic";
        this.raceInterval = null;
        this.raceStats = {
            totalRaces: 47,
            fastestTime: "12.3s"
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderRacers();
        this.updateStats();
        this.updateLeaderboard();
    }
    
    setupEventListeners() {
        const startBtn = document.getElementById('startRaceBtn');
        const resetBtn = document.getElementById('resetRaceBtn');
        const newRacersBtn = document.getElementById('newRacersBtn');
        const speedSlider = document.getElementById('speedSlider');
        const raceTypeSelect = document.getElementById('raceType');
        
        if (startBtn) startBtn.addEventListener('click', () => this.startRace());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetRace());
        if (newRacersBtn) newRacersBtn.addEventListener('click', () => this.shuffleRacers());
        if (speedSlider) speedSlider.addEventListener('input', (e) => this.changeSpeed(e.target.value));
        if (raceTypeSelect) raceTypeSelect.addEventListener('change', (e) => this.changeRaceType(e.target.value));
    }
    
    renderRacers() {
        const lanesContainer = document.getElementById('raceLanes');
        if (!lanesContainer) return;
        
        lanesContainer.innerHTML = '';
        
        this.racers.forEach((racer, index) => {
            const lane = document.createElement('div');
            lane.className = 'race-lane';
            lane.innerHTML = `
                <div class="racer" id="racer-${racer.id}" style="bottom: 5px;">
                    ${racer.avatar}
                </div>
                <div class="racer-name">${racer.name}</div>
            `;
            lanesContainer.appendChild(lane);
        });
    }
    
    startRace() {
        if (this.isRacing) return;
        
        this.isRacing = true;
        this.resetPositions();
        this.showCountdown();
    }
    
    showCountdown() {
        const countdown = document.getElementById('countdown');
        if (!countdown) return;
        
        let count = 3;
        countdown.style.display = 'block';
        countdown.textContent = count;
        
        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdown.textContent = count;
            } else if (count === 0) {
                countdown.textContent = 'GO!';
            } else {
                countdown.style.display = 'none';
                clearInterval(countdownInterval);
                this.runRace();
            }
        }, 1000);
    }
    
    runRace() {
        const trackHeight = 330; // Total height minus start/finish lines
        const finishLine = trackHeight - 20;
        
        this.raceInterval = setInterval(() => {
            let raceFinished = false;
            
            this.racers.forEach(racer => {
                const racerElement = document.getElementById(`racer-${racer.id}`);
                if (!racerElement) return;
                
                // Random speed with some variation
                const baseSpeed = 2 + Math.random() * 3;
                const speedMultiplier = this.raceSpeed;
                const moveDistance = baseSpeed * speedMultiplier;
                
                racer.position += moveDistance;
                
                if (racer.position >= finishLine) {
                    racer.position = finishLine;
                    raceFinished = true;
                }
                
                racerElement.style.bottom = `${racer.position + 5}px`;
                racerElement.classList.add('racing');
            });
            
            if (raceFinished) {
                this.finishRace();
            }
        }, 100);
    }
    
    finishRace() {
        clearInterval(this.raceInterval);
        this.isRacing = false;
        
        // Remove racing animation
        this.racers.forEach(racer => {
            const racerElement = document.getElementById(`racer-${racer.id}`);
            if (racerElement) {
                racerElement.classList.remove('racing');
            }
        });
        
        // Find winner
        const winner = this.racers.reduce((prev, current) => 
            current.position > prev.position ? current : prev
        );
        
        winner.wins += 1;
        this.showWinnerCelebration(winner);
        this.updateStats();
        this.updateLeaderboard();
    }
    
    showWinnerCelebration(winner) {
        const celebration = document.getElementById('winnerCelebration');
        const winnerText = document.getElementById('winnerText');
        
        if (celebration && winnerText) {
            winnerText.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 8px;">${winner.avatar}</div>
                <div>${winner.name} Wins!</div>
                <div style="font-size: 1rem; margin-top: 8px;">🏆 ${winner.wins} total wins</div>
            `;
            
            celebration.style.display = 'flex';
            
            setTimeout(() => {
                celebration.style.display = 'none';
            }, 3000);
        }
    }
    
    resetRace() {
        if (this.isRacing) {
            clearInterval(this.raceInterval);
            this.isRacing = false;
        }
        
        this.resetPositions();
        
        // Hide countdown and celebration
        const countdown = document.getElementById('countdown');
        const celebration = document.getElementById('winnerCelebration');
        if (countdown) countdown.style.display = 'none';
        if (celebration) celebration.style.display = 'none';
    }
    
    resetPositions() {
        this.racers.forEach(racer => {
            racer.position = 0;
            const racerElement = document.getElementById(`racer-${racer.id}`);
            if (racerElement) {
                racerElement.style.bottom = '5px';
                racerElement.classList.remove('racing');
            }
        });
    }
    
    shuffleRacers() {
        if (this.isRacing) return;
        
        // Select 5 random racers from all possible racers
        const shuffled = [...this.allPossibleRacers].sort(() => Math.random() - 0.5);
        this.racers = shuffled.slice(0, 5).map(racer => ({
            ...racer,
            position: 0
        }));
        
        this.renderRacers();
        this.updateLeaderboard();
    }
    
    changeSpeed(value) {
        this.raceSpeed = parseFloat(value);
        const speedLabel = document.getElementById('speedLabel');
        if (speedLabel) {
            const speedMap = {
                '0.5': 'Slow',
                '1': 'Normal',
                '1.5': 'Fast',
                '2': 'Ultra'
            };
            speedLabel.textContent = speedMap[value] || 'Normal';
        }
    }
    
    changeRaceType(type) {
        this.currentRaceType = type;
        // Different race types could have different behaviors
    }
    
    updateStats() {
        const totalRacesEl = document.getElementById('totalRaces');
        const fastestTimeEl = document.getElementById('fastestTime');
        
        if (totalRacesEl) {
            this.raceStats.totalRaces += 1;
            totalRacesEl.textContent = this.raceStats.totalRaces;
        }
        
        if (fastestTimeEl) {
            // Simulate faster times occasionally
            if (Math.random() < 0.3) {
                const newTime = (10 + Math.random() * 5).toFixed(1) + 's';
                this.raceStats.fastestTime = newTime;
                fastestTimeEl.textContent = newTime;
            }
        }
    }
    
    updateLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        if (!leaderboardList) return;
        
        // Sort racers by wins
        const sortedRacers = [...this.racers].sort((a, b) => b.wins - a.wins);
        
        leaderboardList.innerHTML = '';
        sortedRacers.forEach((racer, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            item.innerHTML = `
                <span class="leaderboard-rank">#${index + 1}</span>
                <span style="font-size: 1rem;">${racer.avatar}</span>
                <span class="leaderboard-name">${racer.name}</span>
                <span class="leaderboard-wins">${racer.wins} wins</span>
            `;
            leaderboardList.appendChild(item);
        });
    }
}

// Initialize the vertical trophy race when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the race only if we're on the teacher dashboard
    if (document.getElementById('raceLanes')) {
        window.verticalTrophyRace = new VerticalTrophyRace();
    }
});

// Remove or comment out the old horizontal trophy race code if it exists
// Replace the old race widget section with the new vertical race widget

// Update the canvas-based race with the new vertical race
function startRace() {
    if (window.verticalTrophyRace) {
        window.verticalTrophyRace.startRace();
    }
}

// Add any additional functions that might be called from buttons
function resetTrophyRace() {
    if (window.verticalTrophyRace) {
        window.verticalTrophyRace.resetRace();
    }
}

function shuffleTrophyRacers() {
    if (window.verticalTrophyRace) {
        window.verticalTrophyRace.shuffleRacers();
    }
}

// Update existing teacher dashboard functions to work with the new race
function showTeacherDashboard() {
    const heroContent = document.getElementById('heroContent');
    const studentHero = document.getElementById('studentHero');
    const teacherHero = document.getElementById('teacherHero');
    const teacherDashboard = document.getElementById('teacherDashboard');
    const studentFeatures = document.querySelector('.student-features');
    const teacherFeatures = document.querySelector('.teacher-features');
    const demoSection = document.getElementById('demoSection');
    
    if (heroContent && studentHero && teacherHero && teacherDashboard) {
        studentHero.style.display = 'none';
        teacherHero.style.display = 'none';
        teacherDashboard.style.display = 'block';
        
        if (studentFeatures) studentFeatures.style.display = 'none';
        if (teacherFeatures) teacherFeatures.style.display = 'block';
        if (demoSection) demoSection.style.display = 'none';
        
        // Initialize the vertical trophy race after dashboard is shown
        setTimeout(() => {
            if (!window.verticalTrophyRace && document.getElementById('raceLanes')) {
                window.verticalTrophyRace = new VerticalTrophyRace();
            }
        }, 100);
        
        updateNavigation('teacher');
        updateFooter('teacher');
        updateStats('teacher');
        updateSubjects('teacher');
        updateTestimonials('teacher');
        updateCTA('teacher');
        
        // Populate teacher dashboard with mock data
        populateTeacherDashboard();
    }
}

// Make sure the vertical race is properly initialized when switching views
function switchToTeacher() {
    showTeacherDashboard();
}

// Export for global access if needed
if (typeof window !== 'undefined') {
    window.VerticalTrophyRace = VerticalTrophyRace;
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            showLoading();
            
            setTimeout(() => {
                hideLoading();
                
                const userData = {
                    name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    email: email,
                    role: currentAuthType,
                    class: currentAuthType === 'student' ? '10' : null,
                    school: currentAuthType === 'teacher' ? 'Sample High School' : null,
                    avatar: currentAuthType === 'student' ? '🐰' : null
                };
                
                handleSuccessfulLogin(userData);
                alert(`Login successful! Welcome back, ${userData.name}.`);
            }, 1500);
        });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            let roleData = {};
            if (currentAuthType === 'student') {
                roleData.class = document.getElementById('registerClass').value;
                roleData.avatar = document.getElementById('selectedAvatar').value;
            } else {
                roleData.school = document.getElementById('registerSchool').value;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long!');
                return;
            }
            
            showLoading();
            
            setTimeout(() => {
                hideLoading();
                
                const userData = {
                    name: name,
                    email: email,
                    role: currentAuthType,
                    ...roleData
                };
                
                handleSuccessfulLogin(userData);
                alert(`Registration successful! Welcome to E-Vidya, ${name}!`);
            }, 1500);
        });
    }
    
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('profileName').value;
            const email = document.getElementById('profileEmail').value;
            const phone = document.getElementById('profilePhone').value;
            
            let roleData = {};
            if (currentUser.role === 'teacher') {
                roleData.school = document.getElementById('profileSchoolName').value;
                roleData.subjects = document.getElementById('profileSubjects').value;
            } else {
                roleData.class = document.getElementById('profileClass').value;
                roleData.avatar = document.getElementById('selectedProfileAvatar').value;
                roleData.preferences = Array.from(document.querySelectorAll('input[name="preferences"]:checked'))
                    .map(checkbox => checkbox.value);
            }
            
            if (currentUser) {
                currentUser.name = name;
                currentUser.email = email;
                currentUser.phone = phone;
                Object.assign(currentUser, roleData);
                
                localStorage.setItem('evidya_user', JSON.stringify(currentUser));
                updateUserInterface();
                closeProfileModal();
                alert('Profile updated successfully!');
            }
        });
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const authModal = document.getElementById('authModal');
    if (e.target === authModal) {
        closeAuthModal();
    }
    
    const modals = [
        'profileModal', 'quizHistoryModal', 'achievementsModal',
        'studentAnalyticsModal', 'classPerformanceModal', 
        'studentListModal', 'quizManagementModal'
    ];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && e.target === modal) {
            modal.classList.remove('active');
            if (modalId === 'studentAnalyticsModal') {
                if (performanceChart) performanceChart.destroy();
                if (subjectScoresChart) subjectScoresChart.destroy();
            } else if (modalId === 'classPerformanceModal') {
                if (scoreDistributionChart) scoreDistributionChart.destroy();
                if (gradePerformanceChart) gradePerformanceChart.destroy();
                if (engagementChart) engagementChart.destroy();
                if (weeklyProgressChart) weeklyProgressChart.destroy();
            }
        }
    });
});

// Keyboard event handlers
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAuthModal();
        closeProfileModal();
        closeQuizHistoryModal();
        closeAchievementsModal();
        closeStudentAnalyticsModal();
        closeClassPerformanceModal();
        closeStudentListModal();
        closeQuizManagementModal();
    }
});

// Demo button handlers - STUDENT ONLY
document.addEventListener('DOMContentLoaded', function() {
    const demoButtons = document.querySelectorAll('.demo-card .btn');
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            if (buttonText.includes('Quiz')) {
                alert('🎯 Sample Quiz Preview\n\n✅ Interactive Questions\n✅ Instant Feedback\n✅ Progress Tracking\n✅ Achievement System\n\nJoin E-Vidya to access our full quiz library!');
            } else if (buttonText.includes('Lab')) {
                alert('🔬 Virtual Lab Preview\n\n✅ 3D Simulations\n✅ Safe Experiments\n✅ Real-time Results\n✅ Interactive Tools\n\nRegister to explore our complete virtual laboratory!');
            }
        });
    });
});

// ========== OFFLINE FUNCTIONALITY - APPEND TO YOUR EXISTING app.js ==========

// Offline Status Management
class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.pendingActions = JSON.parse(localStorage.getItem('evidya_offline_queue') || '[]');
        this.init();
    }
    
    init() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('E-Vidya now works offline!', registration);
                })
                .catch(error => {
                    console.log('Service worker registration failed:', error);
                });
        }
        
        // Add offline indicator to your existing design
        this.createOfflineIndicator();
        
        // Listen for online/offline events
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        
        // Save quiz data offline
        this.enhanceExistingFunctions();
    }
    
    createOfflineIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'offline-indicator';
        indicator.innerHTML = `
            <div class="offline-banner" style="
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #f39c12;
                color: white;
                padding: 10px;
                text-align: center;
                z-index: 10000;
                font-size: 14px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            ">
                📱 You're offline. Your progress is being saved locally.
                <button onclick="this.parentElement.style.display='none'" 
                        style="margin-left: 15px; background: white; color: #f39c12; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">
                    Got it
                </button>
            </div>
        `;
        document.body.appendChild(indicator);
    }
    
    handleOffline() {
        document.querySelector('.offline-banner').style.display = 'block';
        this.isOnline = false;
        
        // Show offline message using your existing notification system
        if (typeof showNotification === 'function') {
            showNotification('📱 You\'re now offline. Data will sync when connection returns.', 'info');
        }
    }
    
    handleOnline() {
        document.querySelector('.offline-banner').style.display = 'none';
        this.isOnline = true;
        
        // Sync pending data
        this.syncPendingActions();
        
        if (typeof showNotification === 'function') {
            showNotification('🌐 Connection restored! Syncing your data...', 'success');
        }
    }
    
    // Enhance your existing quiz submission to work offline
    enhanceExistingFunctions() {
        // Store quiz results offline when network unavailable
        window.submitQuizOffline = (quizData) => {
            const offlineData = {
                id: Date.now(),
                type: 'quiz_submission',
                data: quizData,
                timestamp: new Date().toISOString(),
                synced: false
            };
            
            this.pendingActions.push(offlineData);
            localStorage.setItem('evidya_offline_queue', JSON.stringify(this.pendingActions));
            
            // Update your existing quiz history with offline data
            if (currentUser && currentUser.quizHistory) {
                currentUser.quizHistory.unshift({
                    id: offlineData.id,
                    subject: quizData.subject || 'Mathematics',
                    topic: quizData.topic || 'Practice Quiz',
                    class: currentUser.class || 10,
                    score: quizData.score || 85,
                    points: quizData.points || 170,
                    totalQuestions: quizData.totalQuestions || 20,
                    correctAnswers: quizData.correctAnswers || 17,
                    date: new Date().toLocaleDateString(),
                    timeSpent: quizData.timeSpent || 15,
                    offline: true
                });
                
                localStorage.setItem('evidya_user', JSON.stringify(currentUser));
            }
            
            return { success: true, offline: true };
        };
    }
    
    syncPendingActions() {
        if (this.pendingActions.length === 0) return;
        
        // Simulate sync (in real app, you'd send to server)
        setTimeout(() => {
            this.pendingActions = [];
            localStorage.setItem('evidya_offline_queue', JSON.stringify([]));
            console.log('Offline data synced successfully!');
        }, 1000);
    }
}

// Initialize offline functionality when your existing app loads
document.addEventListener('DOMContentLoaded', function() {
    // Your existing DOMContentLoaded code continues to work exactly the same
    
    // Just add this one line to enable offline features
    window.offlineManager = new OfflineManager();
});

// Enhanced localStorage for better offline persistence
const OfflineStorage = {
    save(key, data) {
        try {
            localStorage.setItem('evidya_' + key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Offline storage failed:', error);
            return false;
        }
    },
    
    load(key) {
        try {
            const item = localStorage.getItem('evidya_' + key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Offline storage load failed:', error);
            return null;
        }
    }
};

// Export for your existing code to use
window.OfflineStorage = OfflineStorage;