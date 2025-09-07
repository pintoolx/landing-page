import React from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';

// Footer 以 "Stay Updated" 為主要焦點

// PinTool Logo for Footer (較小尺寸) - 使用 SVG
const ProjectLogo = () => (
  <img 
    src="/images/pintool-logo.svg" 
    alt="PinTool Logo" 
    width="20" 
    height="20"
    className="object-contain"
  />
);

const Footer = () => {
  return (
    <footer className="bg-gray-800 neobrut-border border-t-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 主要 Stay Updated 區域 */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 gradient-text">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be the first to know when PinTool's MVP launches in Q3 2025. Get exclusive updates, early access, and behind-the-scenes insights.
            </p>
            
            {/* Email 訂閱表單 */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email for updates"
                  className="flex-1 px-6 py-4 bg-gray-800 text-white neobrut-border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                />
                <JoinWaitlistButton variant="footer" size="large" />
              </div>
              <p className="text-sm text-gray-400 mt-4">
                No spam, just important updates about PinTool's development.
              </p>
            </div>

            {/* 社交媒體連結 */}
            <div className="flex justify-center items-center space-x-8 mb-8">
              <p className="text-gray-400">Follow our journey:</p>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover-lift">
                <span className="sr-only">X</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 底部品牌區域 */}
        <div className="pt-8 pb-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-3">
            <ProjectLogo />
            <span className="text-lg font-bold text-white">PinTool</span>
          </div>
          <p className="text-gray-500 mt-4 sm:mt-0">&copy; {new Date().getFullYear()} PinTool. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;