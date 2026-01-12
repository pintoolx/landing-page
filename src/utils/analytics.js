// 簡單的分析工具來追蹤用戶行為
class Analytics {
  constructor() {
    this.events = JSON.parse(localStorage.getItem('pintool_analytics') || '[]');
  }

  // 記錄事件
  async track(eventName, properties = {}) {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      properties,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.events.push(event);
    
    // 保存到 localStorage
    localStorage.setItem('pintool_analytics', JSON.stringify(this.events));
    
    // 同時保存到資料庫（用於 Grafana）
    try {
      const { analyticsAPI } = await import('../config/analytics-api');
      await analyticsAPI.trackEvent(eventName, properties);
    } catch (error) {
      console.warn('Failed to save event to database:', error.message);
    }
    
    // 如果有 Google Analytics，也可以發送
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }
    
    console.log('Analytics Event:', event);
  }

  // 獲取所有事件
  getEvents() {
    return this.events;
  }

  // 獲取特定事件的統計
  getEventStats(eventName) {
    const eventCount = this.events.filter(event => event.name === eventName).length;
    return {
      eventName,
      count: eventCount,
      events: this.events.filter(event => event.name === eventName)
    };
  }

  // 清除所有事件（用於測試）
  clear() {
    this.events = [];
    localStorage.removeItem('pintool_analytics');
  }
}

// 創建全域實例
const analytics = new Analytics();

// 常用的追蹤函數
export const trackStartDemo = () => {
  analytics.track('start_demo_clicked', {
    section: 'hero',
    button_type: 'demo'
  });
};

export const trackJoinWaitlist = (email = null) => {
  analytics.track('join_waitlist_clicked', {
    section: 'waitlist',
    button_type: 'waitlist',
    has_email: !!email
  });
};

export const trackWaitlistSubmit = (email) => {
  analytics.track('waitlist_submitted', {
    section: 'waitlist',
    email_domain: email ? email.split('@')[1] : null
  });
};

export const trackHeaderWaitlistClick = () => {
  analytics.track('header_waitlist_clicked', {
    section: 'header',
    button_type: 'waitlist'
  });
};

export const trackXLinkClick = () => {
  analytics.track('x_link_clicked', {
    section: 'footer',
    link_type: 'social',
    platform: 'x_twitter'
  });
};

export const trackTelegramLinkClick = () => {
  analytics.track('telegram_link_clicked', {
    section: 'footer',
    link_type: 'social',
    platform: 'telegram'
  });
};

export default analytics;
