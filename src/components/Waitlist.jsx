import React, { useState, useEffect } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';

const Waitlist = () => {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // 監聽從 Header 滾動過來的事件
    const handleScrollToWaitlist = () => {
      setShowIndicator(true);
      // 5秒後隱藏指示
      setTimeout(() => {
        setShowIndicator(false);
      }, 5000);
    };

    // 監聽自定義事件
    window.addEventListener('scrollToWaitlist', handleScrollToWaitlist);

    return () => {
      window.removeEventListener('scrollToWaitlist', handleScrollToWaitlist);
    };
  }, []);

  return (
    <section id="waitlist" className="py-16" style={{ backgroundColor: '#041131' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Join Waitlist 區域 */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-white">
              Join the Waitlist
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get early access when PinTool launches
            </p>
            
            {/* Email 輸入框 */}
            <div className="flex justify-center mb-4">
              <JoinWaitlistButton
                variant="input"
                placeholder="Enter your email"
                className="mx-auto"
              />
            </div>

            {/* 視覺指示箭頭 */}
            {showIndicator && (
              <div className="flex justify-center mb-4 animate-slide-in-up">
                <div className="flex items-center space-x-2 text-cyan-400 animate-bounce">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  <span className="text-sm font-medium">👆 Enter your email here</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Waitlist;
