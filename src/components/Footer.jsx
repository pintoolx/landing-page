import React, { useState, useEffect } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';

const Footer = () => {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // 監聽從 Header 滾動過來的事件
    const handleScrollToFooter = () => {
      setShowIndicator(true);
      // 5秒後隱藏指示
      setTimeout(() => {
        setShowIndicator(false);
      }, 5000);
    };

    // 監聽自定義事件
    window.addEventListener('scrollToWaitlist', handleScrollToFooter);

    return () => {
      window.removeEventListener('scrollToWaitlist', handleScrollToFooter);
    };
  }, []);

  return (
    <footer className="bg-gray-900/50 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* 主要內容區域 */}
        <div className="max-w-2xl mx-auto text-center">

          {/* Join Waitlist 區域 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Waitlist
            </h3>
            <p className="text-gray-400 mb-6">
              Be first to access PinTool
            </p>
            
            {/* Email 輸入框 */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-cyan-500/20 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative">
                  <JoinWaitlistButton
                    variant="input"
                    placeholder="Enter your email"
                    className="mx-auto"
                  />
                </div>
              </div>
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

          {/* 分隔線 */}
          <div className="border-t border-white/10 pt-8">

            {/* 底部信息 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

              {/* 版權信息 */}
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} PinTool. All rights reserved.
              </p>

              {/* X 社交連結 */}
              <a href="https://x.com/PinToolX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Follow us on X (Twitter)</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;