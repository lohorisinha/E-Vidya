// E-Vidya Storage System
class EvidyaDatabase {
    constructor() {
        this.dbName = 'EvidyaDB';
        this.dbVersion = 1;
        this.db = null;
        this.currentUser = null;
        this.init();
    }

    // Initialize database and user session
    async init() {
        try {
            await this.openDatabase();
            this.loadCurrentUser();
        } catch (error) {
            console.error('Database initialization failed:', error);
        }
    }

    // Open IndexedDB connection
    openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Users store
                if (!db.objectStoreNames.contains('users')) {
                    const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                    userStore.createIndex('email', 'email', { unique: true });
                    userStore.createIndex('class', 'registeredClass', { unique: false });
                }

                // Game sessions store
                if (!db.objectStoreNames.contains('gameSessions')) {
                    const sessionStore = db.createObjectStore('gameSessions', { keyPath: 'id', autoIncrement: true });
                    sessionStore.createIndex('userId', 'userId', { unique: false });
                    sessionStore.createIndex('gameType', 'gameType', { unique: false });
                    sessionStore.createIndex('class', 'classLevel', { unique: false });
                    sessionStore.createIndex('date', 'timestamp', { unique: false });
                }

                // Achievements store
                if (!db.objectStoreNames.contains('achievements')) {
                    const achievementStore = db.createObjectStore('achievements', { keyPath: 'id', autoIncrement: true });
                    achievementStore.createIndex('userId', 'userId', { unique: false });
                    achievementStore.createIndex('type', 'achievementType', { unique: false });
                }

                // Analytics store
                if (!db.objectStoreNames.contains('analytics')) {
                    const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id', autoIncrement: true });
                    analyticsStore.createIndex('userId', 'userId', { unique: false });
                    analyticsStore.createIndex('action', 'actionType', { unique: false });
                    analyticsStore.createIndex('date', 'timestamp', { unique: false });
                }
            };
        });
    }

    // User Registration
    async registerUser(userData) {
        try {
            // Validate required fields
            const requiredFields = ['name', 'email', 'registeredClass'];
            for (const field of requiredFields) {
                if (!userData[field]) {
                    throw new Error(`Missing required field: ${field}`);
                }
            }

            // Check if email already exists
            const existingUser = await this.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            const user = {
                name: userData.name,
                email: userData.email,
                registeredClass: parseInt(userData.registeredClass),
                registrationDate: new Date().toISOString(),
                unlockedLevels: [parseInt(userData.registeredClass)],
                totalScore: 0,
                totalQuestionsAnswered: 0,
                totalCorrectAnswers: 0,
                gameStats: this.initializeGameStats(),
                achievements: this.initializeAchievements(),
                lastLogin: new Date().toISOString(),
                isActive: true
            };

            const transaction = this.db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');
            const result = await this.promisifyRequest(store.add(user));
            
            user.id = result;
            this.currentUser = user;
            this.saveToLocalStorage('currentUser', user);

            // Log registration analytics
            await this.logAnalytics('user_registration', {
                class: user.registeredClass,
                timestamp: user.registrationDate
            });

            return user;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    // User Login
    async loginUser(email, password = null) {
        try {
            const user = await this.getUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }

            // Update last login
            user.lastLogin = new Date().toISOString();
            await this.updateUser(user);

            this.currentUser = user;
            this.saveToLocalStorage('currentUser', user);

            // Log login analytics
            await this.logAnalytics('user_login', {
                userId: user.id,
                class: user.registeredClass
            });

            return user;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    // Get user by email
    async getUserByEmail(email) {
        const transaction = this.db.transaction(['users'], 'readonly');
        const store = transaction.objectStore('users');
        const index = store.index('email');
        return await this.promisifyRequest(index.get(email));
    }

    // Update user data
    async updateUser(userData) {
        const transaction = this.db.transaction(['users'], 'readwrite');
        const store = transaction.objectStore('users');
        await this.promisifyRequest(store.put(userData));
        
        if (this.currentUser && this.currentUser.id === userData.id) {
            this.currentUser = userData;
            this.saveToLocalStorage('currentUser', userData);
        }
    }

    // Save game session
    async saveGameSession(gameData) {
        try {
            if (!this.currentUser) {
                throw new Error('No user logged in');
            }

            const session = {
                userId: this.currentUser.id,
                gameType: gameData.gameType || 'probability_quest',
                classLevel: gameData.classLevel,
                score: gameData.score,
                questionsAnswered: gameData.questionsAnswered,
                correctAnswers: gameData.correctAnswers,
                wrongAnswers: gameData.wrongAnswers,
                accuracy: gameData.questionsAnswered > 0 ? 
                    Math.round((gameData.correctAnswers / gameData.questionsAnswered) * 100) : 0,
                timeSpent: gameData.timeSpent || 0,
                boardPosition: gameData.boardPosition || 25,
                completed: gameData.completed || false,
                unlockedNewLevel: gameData.unlockedNewLevel || false,
                timestamp: new Date().toISOString(),
                sessionData: gameData.sessionData || {}
            };

            const transaction = this.db.transaction(['gameSessions'], 'readwrite');
            const store = transaction.objectStore('gameSessions');
            const result = await this.promisifyRequest(store.add(session));
            
            session.id = result;

            // Update user stats
            await this.updateUserStats(gameData);

            // Check for achievements
            await this.checkAndAwardAchievements(session);

            // Log analytics
            await this.logAnalytics('game_completed', {
                userId: this.currentUser.id,
                gameType: session.gameType,
                score: session.score,
                accuracy: session.accuracy,
                class: session.classLevel
            });

            return session;
        } catch (error) {
            console.error('Failed to save game session:', error);
            throw error;
        }
    }

    // Update user statistics
    async updateUserStats(gameData) {
        if (!this.currentUser) return;

        const user = this.currentUser;
        user.totalScore += gameData.score;
        user.totalQuestionsAnswered += gameData.questionsAnswered;
        user.totalCorrectAnswers += gameData.correctAnswers;

        // Update class-specific stats
        const classLevel = gameData.classLevel;
        if (!user.gameStats[classLevel]) {
            user.gameStats[classLevel] = this.initializeClassStats();
        }

        user.gameStats[classLevel].gamesPlayed++;
        user.gameStats[classLevel].totalScore += gameData.score;
        user.gameStats[classLevel].questionsAnswered += gameData.questionsAnswered;
        user.gameStats[classLevel].correctAnswers += gameData.correctAnswers;
        user.gameStats[classLevel].bestScore = Math.max(
            user.gameStats[classLevel].bestScore, 
            gameData.score
        );

        if (user.gameStats[classLevel].questionsAnswered > 0) {
            user.gameStats[classLevel].accuracy = Math.round(
                (user.gameStats[classLevel].correctAnswers / user.gameStats[classLevel].questionsAnswered) * 100
            );
        }

        // Update unlocked levels
        if (gameData.unlockedNewLevel && !user.unlockedLevels.includes(gameData.unlockedNewLevel)) {
            user.unlockedLevels.push(gameData.unlockedNewLevel);
        }

        await this.updateUser(user);
    }

    // Check and award achievements
    async checkAndAwardAchievements(session) {
        const achievements = [];
        
        // Score-based achievements
        if (session.score >= 100 && !await this.hasAchievement('score_100')) {
            achievements.push(await this.awardAchievement('score_100', 'First Century', 'Scored 100+ points in a game'));
        }
        
        if (session.score >= 500 && !await this.hasAchievement('score_500')) {
            achievements.push(await this.awardAchievement('score_500', 'High Scorer', 'Scored 500+ points in a game'));
        }

        // Accuracy achievements
        if (session.accuracy >= 90 && !await this.hasAchievement('accuracy_90')) {
            achievements.push(await this.awardAchievement('accuracy_90', 'Sharp Mind', 'Achieved 90%+ accuracy'));
        }

        // Streak achievements (would need streak tracking)
        if (session.completed && !await this.hasAchievement('first_completion')) {
            achievements.push(await this.awardAchievement('first_completion', 'Quest Complete', 'Completed your first probability quest'));
        }

        // Class completion achievements
        const classGames = await this.getUserGamesByClass(session.classLevel);
        if (classGames.length >= 5 && !await this.hasAchievement(`class_${session.classLevel}_veteran`)) {
            achievements.push(await this.awardAchievement(
                `class_${session.classLevel}_veteran`, 
                `Class ${session.classLevel} Veteran`, 
                `Played 5+ games in Class ${session.classLevel}`
            ));
        }

        return achievements;
    }

    // Award achievement
    async awardAchievement(achievementId, title, description) {
        const achievement = {
            userId: this.currentUser.id,
            achievementId: achievementId,
            achievementType: 'game',
            title: title,
            description: description,
            earnedDate: new Date().toISOString(),
            classLevel: this.currentUser.registeredClass
        };

        const transaction = this.db.transaction(['achievements'], 'readwrite');
        const store = transaction.objectStore('achievements');
        const result = await this.promisifyRequest(store.add(achievement));
        achievement.id = result;

        // Log achievement analytics
        await this.logAnalytics('achievement_earned', {
            userId: this.currentUser.id,
            achievementId: achievementId,
            title: title
        });

        return achievement;
    }

    // Check if user has achievement
    async hasAchievement(achievementId) {
        if (!this.currentUser) return false;

        const transaction = this.db.transaction(['achievements'], 'readonly');
        const store = transaction.objectStore('achievements');
        const index = store.index('userId');
        const achievements = await this.promisifyRequest(index.getAll(this.currentUser.id));
        
        return achievements.some(achievement => achievement.achievementId === achievementId);
    }

    // Get user's game history
    async getUserGameHistory(limit = 50) {
        if (!this.currentUser) return [];

        const transaction = this.db.transaction(['gameSessions'], 'readonly');
        const store = transaction.objectStore('gameSessions');
        const index = store.index('userId');
        const sessions = await this.promisifyRequest(index.getAll(this.currentUser.id));
        
        return sessions
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    }

    // Get user's games by class
    async getUserGamesByClass(classLevel) {
        if (!this.currentUser) return [];

        const allGames = await this.getUserGameHistory();
        return allGames.filter(game => game.classLevel === classLevel);
    }

    // Get user achievements
    async getUserAchievements() {
        if (!this.currentUser) return [];

        const transaction = this.db.transaction(['achievements'], 'readonly');
        const store = transaction.objectStore('achievements');
        const index = store.index('userId');
        const achievements = await this.promisifyRequest(index.getAll(this.currentUser.id));
        
        return achievements.sort((a, b) => new Date(b.earnedDate) - new Date(a.earnedDate));
    }

    // Log analytics
    async logAnalytics(actionType, data) {
        const analytic = {
            userId: this.currentUser ? this.currentUser.id : null,
            actionType: actionType,
            data: data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        const transaction = this.db.transaction(['analytics'], 'readwrite');
        const store = transaction.objectStore('analytics');
        await this.promisifyRequest(store.add(analytic));
    }

    // Get analytics data
    async getAnalytics(actionType = null, startDate = null, endDate = null) {
        const transaction = this.db.transaction(['analytics'], 'readonly');
        const store = transaction.objectStore('analytics');
        
        let analytics;
        if (actionType) {
            const index = store.index('action');
            analytics = await this.promisifyRequest(index.getAll(actionType));
        } else {
            analytics = await this.promisifyRequest(store.getAll());
        }

        // Filter by date range if provided
        if (startDate || endDate) {
            analytics = analytics.filter(item => {
                const itemDate = new Date(item.timestamp);
                if (startDate && itemDate < new Date(startDate)) return false;
                if (endDate && itemDate > new Date(endDate)) return false;
                return true;
            });
        }

        return analytics.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    // Get leaderboard
    async getLeaderboard(classLevel = null, limit = 10) {
        const transaction = this.db.transaction(['users'], 'readonly');
        const store = transaction.objectStore('users');
        const users = await this.promisifyRequest(store.getAll());

        let filteredUsers = users.filter(user => user.isActive);
        
        if (classLevel) {
            filteredUsers = filteredUsers.filter(user => user.registeredClass === classLevel);
        }

        return filteredUsers
            .sort((a, b) => b.totalScore - a.totalScore)
            .slice(0, limit)
            .map(user => ({
                id: user.id,
                name: user.name,
                class: user.registeredClass,
                totalScore: user.totalScore,
                totalQuestions: user.totalQuestionsAnswered,
                accuracy: user.totalQuestionsAnswered > 0 ? 
                    Math.round((user.totalCorrectAnswers / user.totalQuestionsAnswered) * 100) : 0
            }));
    }

    // Initialize game stats structure
    initializeGameStats() {
        const stats = {};
        for (let i = 6; i <= 12; i++) {
            stats[i] = this.initializeClassStats();
        }
        return stats;
    }

    // Initialize class-specific stats
    initializeClassStats() {
        return {
            gamesPlayed: 0,
            totalScore: 0,
            bestScore: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            accuracy: 0,
            averageScore: 0,
            completedGames: 0
        };
    }

    // Initialize achievements structure
    initializeAchievements() {
        const achievements = {};
        for (let i = 6; i <= 12; i++) {
            achievements[i] = {
                completed: false,
                score: 0,
                questionsAnswered: 0,
                bestAccuracy: 0,
                completedDate: null
            };
        }
        return achievements;
    }

    // Utility functions
    promisifyRequest(request) {
        return new Promise((resolve, reject) => {
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }

    saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(`evidya_${key}`, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(`evidya_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return null;
        }
    }

    loadCurrentUser() {
        const userData = this.loadFromLocalStorage('currentUser');
        if (userData) {
            this.currentUser = userData;
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('evidya_currentUser');
        
        // Log logout analytics
        this.logAnalytics('user_logout', {
            timestamp: new Date().toISOString()
        });
    }

    // Export user data (GDPR compliance)
    async exportUserData() {
        if (!this.currentUser) return null;

        const userData = this.currentUser;
        const gameHistory = await this.getUserGameHistory();
        const achievements = await this.getUserAchievements();
        const analytics = await this.getAnalytics();
        
        return {
            user: userData,
            gameHistory: gameHistory,
            achievements: achievements,
            analytics: analytics.filter(item => item.userId === userData.id),
            exportDate: new Date().toISOString()
        };
    }

    // Delete user account (GDPR compliance)
    async deleteUserAccount() {
        if (!this.currentUser) return false;

        const userId = this.currentUser.id;
        
        // Delete from all stores
        const stores = ['users', 'gameSessions', 'achievements', 'analytics'];
        
        for (const storeName of stores) {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            
            if (storeName === 'users') {
                await this.promisifyRequest(store.delete(userId));
            } else {
                const index = store.index('userId');
                const items = await this.promisifyRequest(index.getAll(userId));
                for (const item of items) {
                    await this.promisifyRequest(store.delete(item.id));
                }
            }
        }

        this.logout();
        return true;
    }
}

// Initialize global database instance
const eVidyaDB = new EvidyaDatabase();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EvidyaDatabase;
}