import React, { useState, useEffect } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';

const Waitlist = () => {

  useEffect(() => {
    // 監聽從 Header 滾動過來的事件
    const handleScrollToWaitlist = () => {
      // 5秒後隱藏指示
      setTimeout(() => {
      }, 5000);
    };

    // 監聽自定義事件
    window.addEventListener('scrollToWaitlist', handleScrollToWaitlist);

    return () => {
      window.removeEventListener('scrollToWaitlist', handleScrollToWaitlist);
    };
  }, []);

  return (
    <section id="waitlist" className="py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Join Waitlist 區域 */}
          <div className="mb-8">
            <h2 className="lg:w-auto lg:h-auto text-center text-black text-2xl lg:text-6xl font-bold font-['Space_Grotesk']">
              Join the Waitlist
            </h2>
            <p className="text-sm lg:text-xl font-bold font-['Space_Grotesk'] -mt-1 mb-6 lg:mb-8 text-black">
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
          </div>

        </div>
      </div>
    </section>
  );
};

export default Waitlist;
