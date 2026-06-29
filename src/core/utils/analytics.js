const STORAGE_KEY = 'portfolio-local-analytics';

export const analytics = {
  logEvent: (name, data = {}) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const logs = stored ? JSON.parse(stored) : [];
      
      const newLog = {
        timestamp: new Date().toISOString(),
        name,
        data
      };

      logs.push(newLog);
      
      // Limit storage logs to last 100 entries to prevent memory bloating
      if (logs.length > 100) {
        logs.shift();
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
      
      // Console logging in dev mode
      if (import.meta.env.DEV) {
        console.log(`[Analytics Event Logged]: ${name}`, data);
      }
    } catch (e) {
      console.warn('Local analytics failed to log event:', e);
    }
  },

  getLogs: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  clearLogs: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }
};
