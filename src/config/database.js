import { createClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 創建 Supabase 客戶端
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Waitlist 服務
export const waitlistService = {
  // 添加郵箱到 waitlist
  async addToWaitlist(email) {
    if (!supabase) {
      console.warn('Supabase not configured, storing locally only');
      return { success: true, data: { email } };
    }

    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email: email,
            created_at: new Date().toISOString(),
            source: 'landing_page'
          }
        ])
        .select();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          return { success: false, error: 'Email already exists in waitlist' };
        }
        throw error;
      }

      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      return { success: false, error: error.message };
    }
  },

  // 獲取 waitlist 統計
  async getWaitlistStats() {
    if (!supabase) {
      return { total: 0, recent: 0 };
    }

    try {
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      // 獲取過去 7 天的註冊數
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      return { total: count || 0, recent: recentCount || 0 };
    } catch (error) {
      console.error('Error getting waitlist stats:', error);
      return { total: 0, recent: 0 };
    }
  }
};

// 創建 waitlist 表格的 SQL（在 Supabase SQL 編輯器中執行）
export const createWaitlistTableSQL = `
-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'landing_page',
  metadata JSONB DEFAULT '{}'
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can add to waitlist)
CREATE POLICY "Enable insert for everyone" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy for reading (anyone can read for statistics)
CREATE POLICY "Enable read for everyone" ON waitlist
  FOR SELECT USING (true);
`;
