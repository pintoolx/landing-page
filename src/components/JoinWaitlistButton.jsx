import React, { useState } from 'react';
import { trackJoinWaitlist, trackWaitlistSubmit } from '../utils/analytics';
import { waitlistService } from '../config/database';

const JoinWaitlistButton = ({ 
  variant = 'primary',     // 'primary' | 'hero' | 'footer' | 'input'
  size = 'default',        // 'default' | 'large' | 'full'
  className = '',          // 額外的 CSS 類別
  onClick,                 // 點擊事件處理
  href = '#',              // 連結目標
  children = 'Join Waitlist', // 按鈕文字（可自訂）
  placeholder = 'Enter your email', // 輸入框占位符
  showBorder = true,       // 是否顯示旋轉邊框動畫
  disabled = false         // 是否禁用按鈕（禁用時無邊框和 hover 效果）
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 根據尺寸調整樣式
  const getSizeClasses = () => {
    const baseClasses = disabled ? 'button-disabled' : 'button';
    switch (size) {
      case 'large':
        return `${baseClasses} text-base px-12 py-3`;
      case 'full':
        return `${baseClasses} w-full justify-center px-6 py-3`;
      default:
        return `${baseClasses} px-6 py-2 text-sm`;
    }
  };

  // 處理輸入框提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 提交到資料庫
      const { success, error: apiError } = await waitlistService.addToWaitlist(email);

      if (!success) {
        if (apiError && apiError.includes('already exists')) {
          setError('This email is already on the waitlist!');
        } else {
          setError('Something went wrong. Please try again.');
        }
        setIsLoading(false);
        return;
      }

      // 追蹤 waitlist 提交事件
      trackWaitlistSubmit(email);

      if (onClick) {
        onClick(email);
      }

      console.log('Email submitted successfully:', email);
      setIsSubmitted(true);

      // 3秒後重置狀態
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        setError('');
      }, 3000);

    } catch (err) {
      console.error('Error submitting email:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 如果是輸入框變體，返回輸入框組合
  if (variant === 'input') {
    if (isSubmitted) {
      return (
        <div className={`input-wrapper ${className}`}>
          <div className="input flex items-center justify-center text-center">
            <span className="text-cyan-400 font-medium">✓ Thanks! You're on the list</span>
          </div>
        </div>
      );
    }

    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="input-wrapper">
          <input
            type="email"
            className="input"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <button type="submit" className="Subscribe-btn" disabled={isLoading}>
            {isLoading ? '...' : 'Join'}
          </button>
        </form>
        {error && (
          <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
        )}
      </div>
    );
  }

  // 旋轉邊框組件
  const DotsBorder = () => (
    <div className="dots_border"></div>
  );

  // 文字組件
  const ButtonText = ({ children }) => (
    <span className="text_button">{children}</span>
  );

  const handleButtonClick = () => {
    // 追蹤按鈕點擊事件
    trackJoinWaitlist();

    if (onClick && !disabled) {
      onClick();
    }
  };

  const buttonContent = (
    <div className={`${getSizeClasses()} ${className}`} onClick={disabled ? undefined : handleButtonClick}>
      {showBorder && !disabled && <DotsBorder />}
      <ButtonText>{children}</ButtonText>
    </div>
  );

  // 如果沒有 onClick 但有 href，包裝在 a 標籤中
  if (!onClick && href !== '#') {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default JoinWaitlistButton;