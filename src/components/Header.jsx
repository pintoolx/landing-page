import React, { useState } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';

// PinTool Logo - 使用 SVG 檔案
const ProjectLogo = () => (
  <img 
    src="/images/pintool-logo.svg" 
    alt="PinTool Logo" 
    width="30" 
    height="30"
    className="object-contain"
  />
);


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 滾動到 Footer 的 Join Waitlist 區域
  const scrollToWaitlist = () => {
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      footerElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // 滾動完成後觸發事件顯示指示
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scrollToWaitlist'));
      }, 1000); // 等待滾動動畫完成
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b-2 border-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-3">
              <ProjectLogo />
              <span className="text-2xl font-bold text-white tracking-tighter">PinTool</span>
            </a>
            <nav className="hidden md:flex ml-10 space-x-8">
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <JoinWaitlistButton
              variant="primary"
              size="large"
              showBorder={false}
              onClick={scrollToWaitlist}
            />
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-center px-5">
              <JoinWaitlistButton
                variant="primary"
                size="full"
                showBorder={false}
                onClick={scrollToWaitlist}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;