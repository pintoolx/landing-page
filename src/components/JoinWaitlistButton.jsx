import React from 'react';

/**
 * 共用的 Join Waitlist 按鈕組件
 * 支援不同的變體和尺寸
 */
const JoinWaitlistButton = ({ 
  variant = 'primary',     // 'primary' | 'hero' | 'footer'
  size = 'default',        // 'default' | 'large' | 'full'
  className = '',          // 額外的 CSS 類別
  onClick,                 // 點擊事件處理
  href = '#',              // 連結目標
  children = 'Join Waitlist' // 按鈕文字（可自訂）
}) => {
  // 基本樣式
  const baseClasses = 'btn btn-primary transition-all duration-300';
  
  // 根據變體添加不同的效果
  const variantClasses = {
    primary: 'hover-lift pulse-ring animate-glow',
    hero: 'hover-lift pulse-ring animate-glow',
    footer: 'hover-lift pulse-ring animate-glow'
  };
  
  // 根據尺寸添加不同的類別
  const sizeClasses = {
    default: '',
    large: 'px-8 py-4',
    full: 'w-full text-center'
  };
  
  // 組合所有類別
  const combinedClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.default,
    className
  ].filter(Boolean).join(' ');
  
  // 如果有 onClick 處理函數，使用 button 元素
  if (onClick) {
    return (
      <button 
        className={combinedClasses}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    );
  }
  
  // 否則使用 a 元素
  return (
    <a 
      href={href}
      className={combinedClasses}
    >
      {children}
    </a>
  );
};

export default JoinWaitlistButton;
