import React, { useState } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 滾動到 Waitlist 區域
  const scrollToWaitlist = () => {
    const waitlistElement = document.querySelector('#waitlist');
    if (waitlistElement) {
      waitlistElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scrollToWaitlist'));
      }, 1000);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent lg:bg-[#E4EAF2] border-b-2 border-transparent">
      <div className="box-border content-stretch flex items-center justify-center lg:justify-between px-[48px] py-[18px] relative h-[64px]">

        <div className="inline-flex items-center">
          <a href="#" className="flex items-center">
            <img src="/images/pintoolLogo.svg" alt="PinTool" className="h-[40px] w-auto object-contain" />
            </a>
          <nav className="hidden lg:flex ml-10 space-x-8">
            </nav>
          </div>
        <div className="hidden lg:flex items-center">
          <JoinWaitlistButton design="pill" size="lg" onClick={scrollToWaitlist}>
            Join Waitlist
          </JoinWaitlistButton>
        </div>

      </div>
    </header>
  );
};

export default Header;