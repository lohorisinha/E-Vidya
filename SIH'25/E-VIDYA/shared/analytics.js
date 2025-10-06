// shared/analytics.js
class AnalyticsManager {
    constructor(database) {
        this.db = database;
        this.sessionStartTime = new Date();
        this.pageViews = 0;
        this.interactions = 0;
        this.isActive = true;
        
        this.init();
    }

    // Initialize analytics tracking
    init() {
        this.trackPageView();
        this.setupEventListeners();
        this.startActivityTracking();
    }

    // Track page views
    trackPageView() {
        this.pageViews++;
        
        const pageData = {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            timestamp: new Date().toISOString()
        };

        this.logEvent('page_view', pageData);
    }

    // Setup event listeners for user interactions
    setupEventListeners() {
        // Click tracking
        document.addEventListener('click', (e) => {
            this.trackClick(e);
        });

        // Form interactions
        document.addEventListener('submit', (e) => {
            this.trackFormSubmission(e);
        });

        // Input focus (engagement)
        document.addEventListener('focus', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.trackInputFocus(e);
            }
        }, true);

        // Page unload
        window.addEventListener('beforeunload', () => {
            this.trackSessionEnd();
        });

        // Visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackTabHidden();
            } else {
                this.trackTabVisible();
            }
        });

        // Error tracking
        window.addEventListener('error', (e) => {
            this.trackError(e);
        });

        // Scroll tracking
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.trackScroll();
            }, 250);
        });
    }

    // Track clicks
    trackClick(event) {
        this.interactions++;
        
        const clickData = {
            elementType: event.target.tagName,
            elementId: event.target.id,
            elementClass: event.target.className,
            elementText: event.target.textContent?.slice(0, 100),
            position: {
                x: event.clientX,
                y: event.clientY
            },
            timestamp: new Date().toISOString()
        };

        this.logEvent('click', clickData);

        // Track button clicks specifically
        if (event.target.tagName === 'BUTTON' || event.target.type === 'submit') {
            this.logEvent('button_click', {
                ...clickData,
                buttonText: event.target.textContent || event.target.value
            });
        }

        // Track link clicks
        if (event.target.tagName === 'A') {
            this.logEvent('link_click', {
                ...clickData,
                href: event.target.href,
                linkText: event.target.textContent
            });
        }
    }

    // Track form submissions
    trackFormSubmission(event) {
        const formData = {
            formId: event.target.id,
            formClass: event.target.className,
            action: event.target.action,
            method: event.target.method,
            fieldCount: event.target.elements.length,
            timestamp: new Date().toISOString()
        };

        this.logEvent('form_submission', formData);
    }

    // Track input focus (engagement indicator)
    trackInputFocus(event) {
        const inputData = {
            inputType: event.target.type,
            inputId: event.target.id,
            inputName: event.target.name,
            timestamp: new Date().toISOString()
        };

        this.logEvent('input_focus', inputData);
    }

    // Track scroll behavior
    trackScroll() {
        const scrollData = {
            scrollTop: window.pageYOffset,
            scrollPercent: Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100),
            timestamp: new Date().toISOString()
        };

        this.logEvent('scroll', scrollData);
    }

    // Track errors
    trackError(event) {
        const errorData = {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack,
            timestamp: new Date().toISOString()
        };

        this.logEvent('javascript_error', errorData);
    }

    // Track tab visibility changes
    trackTabHidden() {
        this.isActive = false;
        this.logEvent('tab_hidden', {
            timestamp: new Date().toISOString()
        });
    }

    trackTabVisible() {
        this.isActive = true;
        this.logEvent('tab_visible', {
            timestamp: new Date().toISOString()
        });
    }

    // Track session end
    trackSessionEnd() {
        const sessionData = {
            sessionDuration: this.getSessionDuration(),
            pageViews: this.pageViews,
            interactions: this.interactions,
            timestamp: new Date().toISOString()
        };

        this.logEvent('session_end', sessionData);
    }

    // Game-specific analytics
    trackGameStart(gameType, classLevel) {
        const gameData = {
            gameType: gameType,
            classLevel: classLevel,
            timestamp: new Date().toISOString()
        };

        this.logEvent('game_start', gameData);
    }

    trackGameEnd(gameType, classLevel, results) {
        const gameData = {
            gameType: gameType,
            classLevel: classLevel,
            duration: results.duration,
            score: results.score,
            completed: results.completed,
            accuracy: results.accuracy,
            questionsAnswered: results.questionsAnswered,
            timestamp: new Date().toISOString()
        };

        this.logEvent('game_end', gameData);
    }

    trackQuestionAnswered(questionData) {
        const data = {
            gameType: questionData.gameType,
            classLevel: questionData.classLevel,
            questionIndex: questionData.questionIndex,
            isCorrect: questionData.isCorrect,
            attempts: questionData.attempts,
            timeToAnswer: questionData.timeToAnswer,
            hintUsed: questionData.hintUsed || false,
            timestamp: new Date().toISOString()
        };

        this.logEvent('question_answered', data);
    }

    trackLevelUnlock(classLevel) {
        const data = {
            newLevel: classLevel,
            timestamp: new Date().toISOString()
        };

        this.logEvent('level_unlocked', data);
    }

    trackAchievementEarned(achievement) {
        const data = {
            achievementId: achievement.achievementId,
            title: achievement.title,
            description: achievement.description,
            timestamp: new Date().toISOString()
        };

        this.logEvent('achievement_earned', data);
    }

    // Learning analytics
    trackLearningPath(pathData) {
        const data = {
            fromLevel: pathData.fromLevel,
            toLevel: pathData.toLevel,
            method: pathData.method, // 'progression', 'jump', 'repeat'
            timestamp: new Date().toISOString()
        };

        this.logEvent('learning_path', data);
    }

    trackStudySession(sessionData) {
        const data = {
            subject: sessionData.subject,
            classLevel: sessionData.classLevel,
            duration: sessionData.duration,
            topicsStudied: sessionData.topicsStudied,
            questionsAttempted: sessionData.questionsAttempted,
            averageAccuracy: sessionData.averageAccuracy,
            timestamp: new Date().toISOString()
        };

        this.logEvent('study_session', data);
    }

    // Performance tracking
    trackPerformance() {
        if (window.performance) {
            const perfData = {
                loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
                domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
                renderTime: performance.now(),
                timestamp: new Date().toISOString()
            };

            this.logEvent('performance', perfData);
        }
    }

    // Activity tracking
    startActivityTracking() {
        // Track activity every 30 seconds if user is active
        setInterval(() => {
            if (this.isActive) {
                this.logEvent('activity_ping', {
                    sessionDuration: this.getSessionDuration(),
                    interactions: this.interactions,
                    timestamp: new Date().toISOString()
                });
            }
        }, 30000);
    }

    // Helper methods
    getSessionDuration() {
        return Math.round((new Date() - this.sessionStartTime) / 1000); // seconds
    }

    // Log event to database
    async logEvent(eventType, eventData) {
        try {
            await this.db.logAnalytics(eventType, eventData);
        } catch (error) {
            console.error('Failed to log analytics event:', error);
        }
    }

    // Get analytics summary for current user
    async getUserAnalyticsSummary(days = 7) {
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
            
            const analytics = await this.db.getAnalytics(null, startDate.toISOString());
            const currentUser = this.db.getCurrentUser();
            
            if (!currentUser) return null;

            const userAnalytics = analytics.filter(item => item.userId === currentUser.id);
            
            return {
                totalEvents: userAnalytics.length,
                gamesSessions: userAnalytics.filter(item => item.actionType === 'game_end').length,
                questionsAnswered: userAnalytics.filter(item => item.actionType === 'question_answered').length,
                averageSessionTime: this.calculateAverageSessionTime(userAnalytics),
                mostActiveDay: this.getMostActiveDay(userAnalytics),
                topGameTypes: this.getTopGameTypes(userAnalytics),
                learningStreak: await this.calculateLearningStreak()
            };
        } catch (error) {
            console.error('Failed to get analytics summary:', error);
            return null;
        }
    }

    // Calculate average session time
    calculateAverageSessionTime(analytics) {
        const sessionEnds = analytics.filter(item => item.actionType === 'session_end');
        if (sessionEnds.length === 0) return 0;
        
        const totalTime = sessionEnds.reduce((sum, session) => {
            return sum + (session.data.sessionDuration || 0);
        }, 0);
        
        return Math.round(totalTime / sessionEnds.length);
    }

    // Get most active day
    getMostActiveDay(analytics) {
        const dayCount = {};
        analytics.forEach(item => {
            const day = new Date(item.timestamp).toDateString();
            dayCount[day] = (dayCount[day] || 0) + 1;
        });
        
        return Object.keys(dayCount).reduce((a, b) => 
            dayCount[a] > dayCount[b] ? a : b, ''
        );
    }

    // Get top game types
    getTopGameTypes(analytics) {
        const gameCount = {};
        analytics.filter(item => item.actionType === 'game_start').forEach(item => {
            const gameType = item.data.gameType;
            gameCount[gameType] = (gameCount[gameType] || 0) + 1;
        });
        
        return Object.entries(gameCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([gameType, count]) => ({ gameType, count }));
    }

    // Calculate learning streak
    async calculateLearningStreak() {
        try {
            const gameHistory = await this.db.getUserGameHistory();
            if (gameHistory.length === 0) return 0;
            
            let streak = 0;
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            
            // Check each day backwards
            while (streak < 100) { // Max streak to prevent infinite loop
                const dayStart = new Date(currentDate);
                const dayEnd = new Date(currentDate);
                dayEnd.setDate(dayEnd.getDate() + 1);
                
                const gamesThisDay = gameHistory.filter(game => {
                    const gameDate = new Date(game.timestamp);
                    return gameDate >= dayStart && gameDate < dayEnd;
                });
                
                if (gamesThisDay.length > 0) {
                    streak++;
                    currentDate.setDate(currentDate.getDate() - 1);
                } else {
                    break;
                }
            }
            
            return streak;
        } catch (error) {
            console.error('Failed to calculate learning streak:', error);
            return 0;
        }
    }
}

// Initialize analytics manager
let analyticsManager = null;

// Initialize when database is ready
document.addEventListener('DOMContentLoaded', function() {
    const checkDatabase = setInterval(() => {
        if (window.eVidyaDB && eVidyaDB.db) {
            analyticsManager = new AnalyticsManager(eVidyaDB);
            
            // Track initial page performance
            setTimeout(() => {
                analyticsManager.trackPerformance();
            }, 1000);
            
            clearInterval(checkDatabase);
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('analyticsManagerReady', { detail: analyticsManager }));
        }
    }, 100);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
}