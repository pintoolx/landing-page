import React, { useState, useEffect } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';
import { trackStartDemo } from '../utils/analytics';
import Vector from '/images/Vector.svg';
import ActiveBg from '/images/active.svg';
import NotStartCard from '/images/notStartCard.svg';
import solanaSolLogo from '/images/solana-sol-logo.svg';
import Rectangle1 from '/images/Rectangle1.svg';
import Rectangle2 from '/images/Rectangle2.svg';

// PinTool workflow steps
const workflowSteps = [
  {
    id: 1,
    title: "Monitor SOL price",
    description: "Pyth Price Feed monitor SOL price is greater than $250",
    status: "waiting"
  },
  {
    id: 2,
    title: "Unstake SOL",
    description: "Unstake SOL from Jito Staking",
    status: "pending"
  },
  {
    id: 3,
    title: "Token Swap",
    description: "Use Jupiter Swap to swap SOL to USDC",
    status: "pending"
  },
  {
    id: 4,
    title: "Deposit to Kamino Lend",
    description: "Deposit USDC to Kamino Lend to earn yield",
    status: "pending"
  },
  {
    id: 5,
    title: "Send Notification",
    description: "Send completion notification to Discord/Telegram",
    status: "pending"
  }
];

// CardStart design (can have dynamic title and description)  
const CardStart = ({ title, description, status, started, stepId }) => {
  const isBlue = started && (status === 'active' || status === 'completed');
  const titleColor = isBlue ? 'text-white' : 'text-[#0e0f28]';
  const descColor = isBlue ? 'text-white' : 'text-[#0e0f28]';
  const showLogo = stepId === 1;
  const logoFilter = isBlue ? '' : 'brightness-0';
  const borderColor = isBlue ? 'border-[#e4eaf2]' : 'border-[#0e0f28]';

  return (
    <div className="relative size-full" data-name="Card/Start" data-node-id="12:102">
      {status === 'active' ? (
        <div className="absolute inset-0" data-name="ActiveBG">
          <img alt="" className="block max-w-none size-full" src={ActiveBg} />
        </div>
      ) : status === 'completed' ? (
        <div className="absolute inset-0" data-name="CompletedBG">
          <img alt="" className="block max-w-none size-full" src={Vector} />
        </div>
      ) : (
        <div className="absolute inset-0" data-name="DisabledBG">
          <img alt="" className="block max-w-none size-full" src={NotStartCard} />
        </div>
      )}
      {showLogo && (
        <div
          className={`absolute border ${borderColor} border-solid box-border content-stretch flex flex-col gap-[10px] inset-[41.04%_80.22%_40.82%_4.68%] items-center justify-center px-[8px] py-[13px] rounded-[80px]`}
          data-node-id="12:104"
        >
          <div className="h-[20px] relative shrink-0 w-[25px]" data-name="solana-sol-logo 1" data-node-id="12:105">
            <img alt="" className={`block max-w-none size-full ${logoFilter}`} src={solanaSolLogo} />
          </div>
        </div>
      )}
      <p
        className={`absolute bottom-[77.28%] font-['Space_Grotesk'] font-semibold text-xl leading-[normal] left-[16.9%] not-italic right-0 text-[20px] text-center ${titleColor} top-[15.5%]`}
        data-node-id="12:292"
      >
        {title}
      </p>
      <p
        className={`absolute text-sm font-semibold font-['Space_Grotesk'] inset-[51.67%_16.9%_38.33%_33.8%] leading-[normal] not-italic text-[14px] text-center ${descColor}`}
        data-node-id="12:293"
      >
        {description}
      </p>
    </div>
  );
};

const Hero = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState(workflowSteps);
  // Mobile carousel index
  const [mobileIndex, setMobileIndex] = useState(0);
  const TRACK_OFFSET = 20; // px, shift track slightly left on mobile

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length) {
      interval = setInterval(() => {
        setSteps(prevSteps => 
          prevSteps.map((step, index) => {
            if (index < currentStep) {
              return { ...step, status: 'completed' };
            } else if (index === currentStep) {
              return { ...step, status: 'active' };
            } else {
              return { ...step, status: 'pending' };
            }
          })
        );
        
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            // ensure the last step is marked as completed
            setSteps(prevSteps =>
              prevSteps.map((step, index) => {
                if (index <= prev) {
                  return { ...step, status: 'completed' };
                } else {
                  return { ...step, status: 'pending' };
                }
              })
            );
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setSteps(workflowSteps.map(step => ({ ...step, status: step.id === 1 ? 'waiting' : 'pending' })));
  };

  const startDemo = () => {
    // track Start Demo click event
    trackStartDemo();

    if (currentStep >= steps.length - 1) {
      resetDemo();
    }
    setIsPlaying(true);
  };

  // Carousel controls for mobile
  const CARD_WIDTH = 240; // px
  const OVERLAP = 36;     // px (mx-[-18px] * 2)
  const EFFECTIVE_STEP = CARD_WIDTH - OVERLAP; // move distance per step
  const maxIndex = steps.length - 1;
  const goPrev = () => setMobileIndex((i) => Math.max(0, i - 1));
  const goNext = () => setMobileIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="relative pt-16 lg:py-24">

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="w-full max-w-[900px] mx-auto text-center text-black text-2xl lg:text-7xl font-bold font-['Space_Grotesk'] leading-tight mb-[18px] lg:mb-10">
            No-Code DeFi Platform on<br />Solana
          </h1>
        </div>

        {/* interactive workflow demo */}
        <div className="mt-8 lg:mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-6 lg:mb-10">
            <div className="flex justify-center gap-4">
              {/* mobile display Join Waitlist, desktop display Start Demo */}
              <div className="lg:hidden">
                <JoinWaitlistButton
                  design="pill"
                  size="sm"
                  className="inline-flex bg-blue-600 px-4 py-1"
                  textClassName="text-slate-200 text-base font-semibold font-['Space_Grotesk']"
                  onClick={() => {
                    const el = document.querySelector('#waitlist');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  track={false}
                >
                  Join Waitlist
                </JoinWaitlistButton>
              </div>
              <div className="hidden lg:block">
                <JoinWaitlistButton
                  design="pill"
                  size="lg"
                  onClick={startDemo}
                  disabled={isPlaying}
                  track={false}
                >
                  {isPlaying ? 'Executing...' : currentStep >= steps.length - 1 ? 'Restart' : 'Start Demo'}
                </JoinWaitlistButton>
              </div>
            </div>
          </div>

          {/* desktop - horizontal layout */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="box-border content-stretch flex items-center justify-center pl-0 pr-[40px] py-0">
                {steps.map((step, index) => (
                  <div key={step.id} className={`relative h-[200px] w-[240px] shrink-0 ${index < steps.length - 1 ? 'mr-[-40px]' : ''}`}>
                    <div className="p-0 w-[240px] h-[200px] aspect-[6/5] relative overflow-hidden bg-transparent">
                      <CardStart title={step.title} description={step.description} status={step.status} started={isPlaying || currentStep > 0} stepId={step.id} />
                    </div>


                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* mobile - horizontal overlapping carousel */}
          <div className="lg:hidden">
            <div className="relative w-[240px] mx-auto">
              {/* Carousel viewport */}
              <div className="w-[240px] h-[200px] mx-auto relative px-[20px]">
                <img
                  src={Rectangle1}
                  alt=""
                  className="pointer-events-none absolute top-0 left-[calc(50%-50vw)] h-full z-10"
                />
                <img
                  src={Rectangle2}
                  alt=""
                  className="pointer-events-none absolute top-0 right-[calc(50%-50vw)] h-full z-10"
                />
                {/* Track */}
                <div
                  className="flex items-center h-[200px]"
                  style={{
                    width: `${CARD_WIDTH + EFFECTIVE_STEP * maxIndex}px`,
                    transform: `translateX(calc(-${mobileIndex * EFFECTIVE_STEP}px - ${TRACK_OFFSET}px))`,
                    transition: 'transform 300ms ease',
                  }}
                >
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`relative w-[240px] h-[200px] mx-[-18px]`}
                      style={{ opacity: index === mobileIndex ? 1 : 1 }}
                    >
                      <div className="p-0 w-[240px] h-[200px] aspect-[6/5] relative overflow-hidden bg-transparent">
                        <CardStart
                          title={step.title}
                          description={step.description}
                          status={step.status}
                          started={isPlaying || currentStep > 0}
                          stepId={step.id}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <button
                type="button"
                aria-label="Previous"
                onClick={goPrev}
                className="absolute left-[-56px] top-1/2 -translate-y-1/2 bg-transparent text-[#0E0F28] w-7 h-7 flex items-center justify-center disabled:hidden"
                disabled={mobileIndex === 0}
              >
                {/* lucide chevron-left */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={goNext}
                className="absolute right-[-55px] top-1/2 -translate-y-1/2 bg-transparent text-[#0E0F28] w-7 h-7 flex items-center justify-center disabled:hidden"
                disabled={mobileIndex === maxIndex}
              >
                {/* lucide chevron-right */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* result display (desktop only) */}
          <div className="mt-8 hidden lg:flex items-center justify-center h-6">
            <div className={`w-full max-w-[600px] h-6 bg-slate-900 rounded-[64px] ${currentStep >= steps.length - 1 && !isPlaying ? 'visible' : 'invisible'
              }`}>
              <div className="h-full w-full flex items-center justify-center text-center">
                <span className="text-slate-200 text-xs font-bold font-['Space_Grotesk'] tracking-tight mr-1">Workflow completed! </span>
                <span className="text-slate-200 text-xs font-medium font-['Space_Grotesk'] tracking-tight">Successfully swapped SOL to USDC and deposited to Kamino Lend.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;