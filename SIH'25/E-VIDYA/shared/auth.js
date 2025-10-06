// shared/auth.js
class AuthManager {
    constructor(database) {
        this.db = database;
    }

    // Register user from the main index page
    async registerUser(formData) {
        try {
            // Validate form data
            if (!formData.name || !formData.email || !formData.registeredClass) {
                throw new Error('All fields are required');
            }

            if (!this.isValidEmail(formData.email)) {
                throw new Error('Invalid email format');
            }

            if (formData.password && formData.password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            const userData = {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                registeredClass: parseInt(formData.registeredClass),
                password: formData.password // In real app, hash this!
            };

            const user = await this.db.registerUser(userData);
            
            // Set session
            this.setSession(user);
            
            return user;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    // Login user
    async loginUser(email, password = null) {
        try {
            if (!email) {
                throw new Error('Email is required');
            }

            const user = await this.db.loginUser(email.trim().toLowerCase(), password);
            
            // Set session
            this.setSession(user);

            return user;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    // Set user session
    setSession(user) {
        // Store session info
        sessionStorage.setItem('eVidyaSession', JSON.stringify({
            userId: user.id,
            email: user.email,
            loginTime: new Date().toISOString(),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        }));

        // Log session start
        this.db.logAnalytics('session_start', {
            userId: user.id,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        });
    }

    // Check if user is logged in
    isLoggedIn() {
        const currentUser = this.db.getCurrentUser();
        const session = this.getSession();
        
        if (!currentUser || !session) {
            return false;
        }

        // Check if session is expired
        if (new Date() > new Date(session.expires)) {
            this.logout();
            return false;
        }

        return true;
    }

    // Get current session
    getSession() {
        try {
            const sessionData = sessionStorage.getItem('eVidyaSession');
            return sessionData ? JSON.parse(sessionData) : null;
        } catch (error) {
            console.error('Failed to get session:', error);
            return null;
        }
    }

    // Get current user with session validation
    getCurrentUser() {
        if (!this.isLoggedIn()) {
            return null;
        }
        return this.db.getCurrentUser();
    }

    // Logout user
    async logout() {
        const currentUser = this.getCurrentUser();
        
        if (currentUser) {
            // Log session end
            await this.db.logAnalytics('session_end', {
                userId: currentUser.id,
                sessionDuration: this.getSessionDuration(),
                timestamp: new Date().toISOString()
            });
        }

        // Clear database user
        this.db.logout();
        
        // Clear session
        sessionStorage.removeItem('eVidyaSession');
        
        // Clear any other stored data
        this.clearStoredData();
    }

    // Get session duration in minutes
    getSessionDuration() {
        const session = this.getSession();
        if (!session) return 0;
        
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        return Math.round((now - loginTime) / (1000 * 60)); // minutes
    }

    // Clear stored data on logout
    clearStoredData() {
        // Clear any game-specific data
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('evidya_')) {
                keysToRemove.push(key);
            }
        }
        
        keysToRemove.forEach(key => {
            if (key !== 'evidya_currentUser') { // Keep user data for auto-login
                localStorage.removeItem(key);
            }
        });
    }

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Check if user needs to be redirected to login
    requireAuth() {
        if (!this.isLoggedIn()) {
            // Store current page for redirect after login
            sessionStorage.setItem('eVidyaRedirect', window.location.pathname);
            
            // Redirect to login
            window.location.href = '/index/index.html';
            return false;
        }
        return true;
    }

    // Handle redirect after login
    handlePostLoginRedirect() {
        const redirectPath = sessionStorage.getItem('eVidyaRedirect');
        if (redirectPath) {
            sessionStorage.removeItem('eVidyaRedirect');
            window.location.href = redirectPath;
        } else {
            // Default redirect to dashboard
            window.location.href = '/dashboard.html';
        }
    }

    // Update user profile
    async updateProfile(updateData) {
        try {
            const currentUser = this.getCurrentUser();
            if (!currentUser) {
                throw new Error('No user logged in');
            }

            // Validate update data
            const allowedFields = ['name', 'email'];
            const updates = {};
            
            for (const field of allowedFields) {
                if (updateData[field] !== undefined) {
                    if (field === 'email' && !this.isValidEmail(updateData[field])) {
                        throw new Error('Invalid email format');
                    }
                    updates[field] = updateData[field];
                }
            }

            // Update user data
            const updatedUser = { ...currentUser, ...updates };
            await this.db.updateUser(updatedUser);

            // Log profile update
            await this.db.logAnalytics('profile_updated', {
                userId: currentUser.id,
                updatedFields: Object.keys(updates),
                timestamp: new Date().toISOString()
            });

            return updatedUser;
        } catch (error) {
            console.error('Profile update failed:', error);
            throw error;
        }
    }

    // Change password (placeholder for future implementation)
    async changePassword(currentPassword, newPassword) {
        try {
            const currentUser = this.getCurrentUser();
            if (!currentUser) {
                throw new Error('No user logged in');
            }

            // In a real app, you would:
            // 1. Verify current password
            // 2. Hash new password
            // 3. Update in database
            
            // For now, just log the attempt
            await this.db.logAnalytics('password_change_attempt', {
                userId: currentUser.id,
                timestamp: new Date().toISOString()
            });

            throw new Error('Password change not implemented yet');
        } catch (error) {
            console.error('Password change failed:', error);
            throw error;
        }
    }

    // Get user preferences
    getUserPreferences() {
        const user = this.getCurrentUser();
        if (!user) return null;

        return {
            theme: localStorage.getItem(`evidya_theme_${user.id}`) || 'light',
            notifications: localStorage.getItem(`evidya_notifications_${user.id}`) !== 'false',
            soundEffects: localStorage.getItem(`evidya_sounds_${user.id}`) !== 'false',
            difficulty: localStorage.getItem(`evidya_difficulty_${user.id}`) || 'normal'
        };
    }

    // Save user preferences
    saveUserPreferences(preferences) {
        const user = this.getCurrentUser();
        if (!user) return;

        if (preferences.theme) {
            localStorage.setItem(`evidya_theme_${user.id}`, preferences.theme);
        }
        if (preferences.notifications !== undefined) {
            localStorage.setItem(`evidya_notifications_${user.id}`, preferences.notifications.toString());
        }
        if (preferences.soundEffects !== undefined) {
            localStorage.setItem(`evidya_sounds_${user.id}`, preferences.soundEffects.toString());
        }
        if (preferences.difficulty) {
            localStorage.setItem(`evidya_difficulty_${user.id}`, preferences.difficulty);
        }

        // Log preferences update
        this.db.logAnalytics('preferences_updated', {
            userId: user.id,
            preferences: preferences,
            timestamp: new Date().toISOString()
        });
    }
}

// Initialize auth manager (will be created after database is ready)
let authManager = null;

// Initialize when database is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for database to be ready
    const checkDatabase = setInterval(() => {
        if (window.eVidyaDB && eVidyaDB.db) {
            authManager = new AuthManager(eVidyaDB);
            clearInterval(checkDatabase);
            
            // Dispatch custom event to notify other scripts
            window.dispatchEvent(new CustomEvent('authManagerReady', { detail: authManager }));
        }
    }, 100);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}