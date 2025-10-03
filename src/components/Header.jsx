import React, { useState } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 滾動到 Waitlist 區域
  const scrollToWaitlist = () => {
    const waitlistElement = document.querySelector('#waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({
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
    <header className="sticky top-0 z-50 bg-[#E4EAF2] border-b-2 border-transparent">
      <div className="box-border content-stretch flex items-center justify-between px-[264px] py-[18px] relative h-[64px]">

          <div className="flex items-center">
          <a href="#" className="flex items-center">
            <img src="/images/pintoolLogo.svg" alt="PinTool" className="h-9 w-auto object-contain" />
            </a>
            <nav className="hidden md:flex ml-10 space-x-8">
            </nav>
          </div>
        <div className="hidden md:flex items-center">
          <JoinWaitlistButton design="pill" size="sm" onClick={scrollToWaitlist}>
            Join Waitlist
          </JoinWaitlistButton>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#E4EAF2]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-center px-5">
              <JoinWaitlistButton design="pill" size="full" className="mt-2" onClick={scrollToWaitlist}>
                Join Waitlist
              </JoinWaitlistButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;