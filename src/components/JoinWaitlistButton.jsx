import React, { useState } from 'react';
import { trackJoinWaitlist, trackWaitlistSubmit } from '../utils/analytics';
import { waitlistService } from '../config/database';

const JoinWaitlistButton = ({ 
  variant = 'primary',     // 'primary' | 'hero' | 'footer' | 'input'
  size = 'default',        // 'default' | 'large' | 'full' | 'sm' | 'lg'
  design = undefined,      // 'pill' use Tailwind style pill button
  track = true,            // whether to track join waitlist event
  className = '',          // additional CSS classes
  textClassName = '',      // text style override (color/weight/font/size)
  onClick,                 // click event handler
  href = '#',              // link target
  children = 'Join Waitlist', // button text (can be customized)
  placeholder = 'Enter your email', // input placeholder
  showBorder = true,       // whether to show rotating border animation (only for non-pill design)
  disabled = false         // whether to disable button (when disabled, no border and hover effect)
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // pill button size (Tailwind)
  const getPillClasses = () => {
    // Header small button (16px font) and Hero large button (24px font)
    switch (size) {
      case 'lg':
      case 'large':
        return 'px-[16px] py-[4px] rounded-[48px] text-[24px]';
      case 'full':
        return 'w-full justify-center px-[16px] py-[8px] rounded-[48px] text-[16px]';
      case 'sm':
        return 'px-[16px] py-[4px] rounded-[48px] text-[16px]';
      default:
        return 'px-[16px] py-[4px] rounded-[48px] text-[16px]';
    }
  };

  // original style (for compatibility)
  const getLegacySizeClasses = () => {
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

  // handle input submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // submit to database
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

      // track waitlist submit event
      trackWaitlistSubmit(email);

      if (onClick) {
        onClick(email);
      }

      console.log('Email submitted successfully:', email);
      setIsSubmitted(true);

      // 3 seconds later reset state
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

  // if input variant, return input combination
  if (variant === 'input') {
    if (isSubmitted) {
      return (
        <div className={`input-wrapper ${className}`}>
          <div className="input flex items-center justify-center text-center">
            <span className="text-black font-medium">✓ Thanks! You're on the list</span>
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

  // rotating border component (only for old design)
  const DotsBorder = () => (
    <div className="dots_border"></div>
  );

  // text component
  const ButtonText = ({ children }) => (
    <span className="text_button">{children}</span>
  );

  const handleButtonClick = () => {
    // track button click event (can be disabled)
    if (track) {
      trackJoinWaitlist();
    }

    if (onClick && !disabled) {
      onClick();
    }
  };

  const buttonContent = (
    design === 'pill' ? (
      // according to UI code, use two divs structure, keep onClick and style override
      <div
        className={`px-4 py-1 bg-blue-600 rounded-[48px] inline-flex justify-center items-center ${disabled ? 'opacity-60 pointer-events-none' : ''} ${className}`}
        onClick={disabled ? undefined : handleButtonClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleButtonClick();
          }
        }}
      >
        <div className={`text-center justify-start text-slate-200 text-2xl font-semibold font-['Space_Grotesk'] ${textClassName}`}>{children}</div>
      </div>
    ) : (
      <div className={`${getLegacySizeClasses()} ${className}`} onClick={disabled ? undefined : handleButtonClick}>
        {showBorder && !disabled && <DotsBorder />}
        <ButtonText>{children}</ButtonText>
      </div>
      )
  );

  // if there is no onClick but has href, wrap in a tag
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