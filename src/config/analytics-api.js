import { supabase } from './database';

// 分析事件 API
export const analyticsAPI = {
  // 記錄事件到資料庫（用於 Grafana 顯示）
  async trackEvent(eventName, properties = {}) {
    if (!supabase) {
      console.warn('Supabase not configured, event not stored in database');
      return { success: false, error: 'Database not configured' };
    }

    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .insert([
          {
            event_name: eventName,
            properties: properties,
            timestamp: new Date().toISOString(),
            session_id: this.getSessionId(),
            url: window.location.href,
            user_agent: navigator.userAgent
          }
        ]);

      if (error) {
        console.error('Error tracking event:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err) {
      console.error('Analytics API error:', err);
      return { success: false, error: err.message };
    }
  },

  // 獲取 session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem('pintool_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('pintool_session_id', sessionId);
    }
    return sessionId;
  },

  // 批量獲取事件統計（用於前端顯示）
  async getEventStats(days = 30) {
    if (!supabase) {
      return { success: false, error: 'Database not configured' };
    }

    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('analytics_events')
        .select('event_name, timestamp')
        .gte('timestamp', startDate.toISOString());

      if (error) {
        return { success: false, error: error.message };
      }

      // 統計事件
      const stats = data.reduce((acc, event) => {
        acc[event.event_name] = (acc[event.event_name] || 0) + 1;
        return acc;
      }, {});

      return { success: true, stats, total: data.length };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

// 創建 analytics_events 表格的 SQL
export const createAnalyticsTableSQL = `
-- 創建 analytics_events 表格（在 Supabase SQL 編輯器中執行）
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  properties JSONB DEFAULT '{}',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id VARCHAR(100),
  url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);

-- 啟用 RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- 創建政策
CREATE POLICY "analytics_events_all_access" ON analytics_events 
  FOR ALL USING (true) WITH CHECK (true);
`;
