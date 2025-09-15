import React, { useState } from 'react';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(email);
    }
    // 這裡可以添加實際的 waitlist 提交邏輯
    console.log('Email submitted:', email);
    setIsSubmitted(true);

    // 3秒後重置狀態，允許再次提交
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
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
      <form onSubmit={handleSubmit} className={`input-wrapper ${className}`}>
        <input
          type="email"
          className="input"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="Subscribe-btn">
          Join
        </button>
      </form>
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

  const buttonContent = (
    <div className={`${getSizeClasses()} ${className}`} onClick={disabled ? undefined : onClick}>
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