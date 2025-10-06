// Translation data
const translations = {
    english: {
        title: "Science Curriculum",
        subtitle: "Explore Physics, Chemistry, and Biology",
        startLearning: "Start Learning",
        comingSoon: "Coming Soon",
        physics: "Physics",
        chemistry: "Chemistry",
        biology: "Biology",
        physicsDesc: "Explore the fundamental laws that govern our universe through interactive experiments and simulations",
        chemistryDesc: "Discover the building blocks of matter and chemical reactions through virtual laboratory experiments",
        biologyDesc: "Understand life processes and living organisms from molecules to ecosystems"
    },
    hindi: {
        title: "विज्ञान पाठ्यक्रम",
        subtitle: "भौतिक विज्ञान, रसायन विज्ञान और जीव विज्ञान का अन्वेषण करें",
        startLearning: "सीखना शुरू करें",
        comingSoon: "जल्द आ रहा है",
        physics: "भौतिक विज्ञान",
        chemistry: "रसायन विज्ञान",
        biology: "जीव विज्ञान",
        physicsDesc: "इंटरैक्टिव प्रयोगों और सिमुलेशन के माध्यम से हमारे ब्रह्मांड को नियंत्रित करने वाले मौलिक नियमों का अन्वेषण करें",
        chemistryDesc: "आभासी प्रयोगशाला प्रयोगों के माध्यम से पदार्थ और रासायनिक अभिक्रियाओं के निर्माण खंडों की खोज करें",
        biologyDesc: "अणुओं से पारिस्थितिकी तंत्र तक जीवन प्रक्रियाओं और जीवित जीवों को समझें"
    },
    odia: {
        title: "ବିଜ୍ଞାନ ପାଠ୍ୟକ୍ରମ",
        subtitle: "ଭୌତିକ ବିଜ୍ଞାନ, ରସାୟନ ବିଜ୍ଞାନ ଏବଂ ଜୀବ ବିଜ୍ଞାନ ଅନୁସନ୍ଧାନ କରନ୍ତୁ",
        startLearning: "ଶିଖିବା ଆରମ୍ଭ କରନ୍ତୁ",
        comingSoon: "ଶୀଘ୍ର ଆସୁଛି",
        physics: "ଭୌତିକ ବିଜ୍ଞାନ",
        chemistry: "ରସାୟନ ବିଜ୍ଞାନ",
        biology: "ଜୀବ ବିଜ୍ଞାନ",
        physicsDesc: "ଇଣ୍ଟରାକ୍ଟିଭ୍ ପରୀକ୍ଷଣ ଏବଂ ସିମୁଲେସନ୍ ମାଧ୍ୟମରେ ଆମ ବ୍ରହ୍ମାଣ୍ଡକୁ ନିୟନ୍ତ୍ରଣ କରୁଥିବା ମୌଳିକ ନିୟମଗୁଡ଼ିକର ଅନୁସନ୍ଧାନ କରନ୍ତୁ",
        chemistryDesc: "ଭର୍ଚୁଆଲ୍ ଲାବୋରେଟୋରୀ ପରୀକ୍ଷଣ ମାଧ୍ୟମରେ ପଦାର୍ଥ ଏବଂ ରାସାୟନିକ ପ୍ରତିକ୍ରିୟାର ନିର୍ମାଣ ବ୍ଲକ୍ ଆବିଷ୍କାର କରନ୍ତୁ",
        biologyDesc: "ଅଣୁରୁ ଇକୋସିଷ୍ଟମ୍ ପର୍ଯ୍ୟନ୍ତ ଜୀବନ ପ୍ରକ୍ରିୟା ଏବଂ ଜୀବଜନ୍ତୁଙ୍କୁ ବୁଝନ୍ତୁ"
    }
};

let currentLanguage = 'english';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initFloatingIcons();
    initSubjectCards();
    initSmoothScrolling();
    initParallaxEffect();
});

// Language change functionality
function changeLanguage(language) {
    currentLanguage = language;
    updateTexts();
}

function updateTexts() {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Home navigation functionality
function goHome() {
    // Navigate to main front page
    window.location.href = '../front-page/fp.html';
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid #e2e8f0';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottom = '1px solid #f7fafc';
        }
    });
}

// Enhanced floating icons animation
function initFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    icons.forEach((icon, index) => {
        // Random animation duration
        const duration = Math.random() * 3 + 4; // 4-7 seconds
        icon.style.animationDuration = duration + 's';
        
        // Add random rotation on hover
        icon.addEventListener('mouseenter', function() {
            this.style.transform = `scale(1.2) rotate(${Math.random() * 360}deg)`;
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Subject cards interactive effects
function initSubjectCards() {
    const cards = document.querySelectorAll('.subject-card');
    cards.forEach(card => {
        // Add mouse tracking effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // Add topic tag interactions
        const topicTags = card.querySelectorAll('.topic-tag');
        topicTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Add a pulse effect
                this.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
                
                // Show topic details (placeholder)
                showTopicDetails(this.textContent, card.dataset.subject);
            });
        });
    });
}

// ========================================================================================
// UPDATED START LEARNING FUNCTION - MAIN CHANGES ARE HERE
// ========================================================================================
function startLearning(subject) {
    console.log('🚀 Starting learning for:', subject);
    
    // Add button click animation
    const clickedButton = event.target;
    const originalText = clickedButton.innerHTML;
    clickedButton.style.transform = 'scale(0.95)';
    clickedButton.innerHTML = '⏳ Loading...';
    clickedButton.disabled = true;
    
    setTimeout(() => {
        clickedButton.style.transform = '';
    }, 150);
    
    // Handle different subjects according to user requirements
    if (subject === 'Physics') {
        // PHYSICS: Navigate to ../1-physics/class-11/index.html
        console.log('📖 Navigating to Physics Class 11...');
        try {
            window.location.href = '../1-science/1-physics/class-11/index.html';
        } catch (error) {
            console.error('❌ Navigation error:', error);
            alert('Navigation failed. Please check if the Physics curriculum file exists at: ../1-physics/class-11/index.html');
            clickedButton.innerHTML = originalText;
            clickedButton.disabled = false;
        }
    } else if (subject === 'Chemistry') {
        // CHEMISTRY: Show "Coming Soon" message instead of navigation
        console.log('ℹ️ Chemistry coming soon message');
        clickedButton.innerHTML = originalText;
        clickedButton.disabled = false;
        
        alert('🧪 Chemistry Curriculum Coming Soon!\n\nWe\'re working hard to bring you amazing Chemistry learning experiences including:\n\n• Virtual Laboratory Experiments\n• Organic & Inorganic Chemistry\n• Chemical Bonding & Reactions\n• Periodic Table Deep Dive\n• Interactive Molecular Models\n\nStay tuned for an amazing learning experience!');
    } else if (subject === 'Biology') {
        // BIOLOGY: Show "Coming Soon" message instead of navigation
        console.log('ℹ️ Biology coming soon message');
        clickedButton.innerHTML = originalText;
        clickedButton.disabled = false;
        
        alert('🧬 Biology Curriculum Coming Soon!\n\nWe\'re creating engaging Biology content including:\n\n• Cell Biology & Genetics\n• Human Physiology Systems\n• Evolution & Natural Selection\n• Ecology & Environmental Science\n• Interactive 3D Organ Models\n\nGet ready to explore the wonders of life!');
    } else {
        // Fallback for unknown subjects
        console.log('❓ Unknown subject:', subject);
        clickedButton.innerHTML = originalText;
        clickedButton.disabled = false;
        
        alert(`${subject} curriculum information is not available yet.`);
    }
}

// Enhanced navigation function specifically for Physics with error handling
function navigateToPhysics() {
    const physicsPath = '../1-science/1-physics/class-11/index.html';
    console.log('🔬 Attempting to navigate to:', physicsPath);
    
    try {
        // Check if we can navigate
        window.location.href = physicsPath;
    } catch (error) {
        console.error('❌ Physics navigation error:', error);
        alert(`Failed to navigate to Physics curriculum.\nExpected location: ${physicsPath}\n\nPlease ensure the file exists in your folder structure.`);
    }
}

// Show coming soon message with enhanced styling
function showComingSoonMessage(subject, details) {
    const messages = {
        'Chemistry': {
            icon: '🧪',
            title: 'Chemistry Curriculum Coming Soon!',
            content: 'We\'re developing comprehensive Chemistry lessons including:\n\n• Virtual Laboratory Experiments\n• Organic & Inorganic Chemistry\n• Chemical Bonding & Reactions\n• Periodic Table Deep Dive\n• Interactive Molecular Models\n\nStay tuned for an amazing learning experience!'
        },
        'Biology': {
            icon: '🧬',
            title: 'Biology Curriculum Coming Soon!',
            content: 'We\'re creating engaging Biology content including:\n\n• Cell Biology & Genetics\n• Human Physiology Systems\n• Evolution & Natural Selection\n• Ecology & Environmental Science\n• Interactive 3D Organ Models\n\nGet ready to explore the wonders of life!'
        }
    };
    
    const messageData = messages[subject] || {
        icon: '📚',
        title: `${subject} Coming Soon!`,
        content: `${subject} curriculum is being developed. Stay tuned!`
    };
    
    alert(`${messageData.icon} ${messageData.title}\n\n${messageData.content}`);
}

// Show topic details (placeholder)
function showTopicDetails(topic, subject) {
    const details = {
        'Physics': {
            'Mechanics': 'Study of motion, forces, and energy in physical systems',
            'Thermodynamics': 'Laws governing heat, temperature, and energy transfer', 
            'Optics': 'Behavior and properties of light and vision',
            'Electricity': 'Electric charges, currents, and electromagnetic phenomena',
            'Modern Physics': 'Quantum mechanics, relativity, and atomic structure'
        },
        'Chemistry': {
            'Atomic Structure': 'Composition and behavior of atoms and subatomic particles',
            'Chemical Bonding': 'How atoms combine to form molecules and compounds',
            'Reactions': 'Chemical processes and transformation of matter',
            'Organic Chemistry': 'Chemistry of carbon-containing compounds',
            'Periodic Table': 'Organization and properties of chemical elements'
        },
        'Biology': {
            'Cell Biology': 'Structure and function of cells, the basic units of life',
            'Genetics': 'Heredity, DNA, and genetic variation',
            'Evolution': 'Change in species over time and natural selection',
            'Ecology': 'Relationships between organisms and their environment',
            'Human Physiology': 'Function of organs and systems in the human body'
        }
    };
    
    const description = details[subject]?.[topic] || 'Detailed study of this topic';
    
    // Create a small tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'topic-tooltip';
    tooltip.textContent = description;
    tooltip.style.cssText = `
        position: fixed;
        background: #1a202c;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        max-width: 250px;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        animation: tooltipFadeIn 0.2s ease-out;
    `;
    
    // Position tooltip
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 10) + 'px';
    
    document.body.appendChild(tooltip);
    
    // Remove tooltip after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.style.animation = 'tooltipFadeOut 0.2s ease-in forwards';
            setTimeout(() => tooltip.remove(), 200);
        }
    }, 3000);
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add CSS animations
const additionalStyles = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes tooltipFadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes tooltipFadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-5px); }
    }
`;

// Add additional styles
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe subject cards for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.subject-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

// Debug and testing functions
function testNavigation() {
    console.group('🔍 Navigation Testing');
    console.log('Testing Physics navigation path...');
    console.log('Expected: ../1-science/1-physics/class-11/index.html');
    console.log('Current location:', window.location.href);
    console.log('Base URL:', window.location.origin);
    console.groupEnd();
}

function checkFileStructure() {
    const expectedPaths = [
        '../1-science/1-physics/class-11/index.html',
        '../front-page/fp.html'
    ];
    
    console.group('📁 Expected File Structure');
    expectedPaths.forEach(path => {
        console.log(`Expected: ${path}`);
    });
    console.groupEnd();
}

// Global function declarations to make them available to HTML onclick
window.startLearning = startLearning;
window.goHome = goHome;
window.changeLanguage = changeLanguage;
window.navigateToPhysics = navigateToPhysics;
window.testNavigation = testNavigation;
window.checkFileStructure = checkFileStructure;