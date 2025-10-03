import React, { useState, useEffect } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';
import { trackStartDemo } from '../utils/analytics';
import Vector from '/images/Vector.svg';
import ActiveBg from '/images/active.svg';
import NotStartCard from '/images/notStartCard.svg';
import solanaSolLogo from '/images/solana-sol-logo.svg';

// PinTool 工作流程步驟
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

// CardStart 設計（可帶動態標題與描述）
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
        className={`absolute bottom-[77.28%] font-['Space_Grotesk:SemiBold',_sans-serif] leading-[normal] left-[16.9%] not-italic right-0 text-[20px] text-center ${titleColor} top-[15.5%]`}
        data-node-id="12:292"
      >
        {title}
      </p>
      <p
        className={`absolute font-['Space_Grotesk:SemiBold',_sans-serif] inset-[51.67%_16.9%_38.33%_33.8%] leading-[normal] not-italic text-[14px] text-center ${descColor}`}
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
            // 確保最後一步也標記為完成
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
    // 追蹤 Start Demo 點擊事件
    trackStartDemo();

    if (currentStep >= steps.length - 1) {
      resetDemo();
    }
    setIsPlaying(true);
  };

  return (
    <section className="relative py-16 md:py-24">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="w-[798px] mx-auto h-36 text-center text-black text-6xl font-bold font-['Space_Grotesk'] leading-tight">
            No-Code DeFi Platform on<br />Solana
          </h1>
        </div>

        {/* 互動式工作流程演示 */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-4">
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

          {/* Desktop - horizontal layout */}
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

          {/* Mobile and tablet - vertical layout */}
          <div className="lg:hidden">
            <div className="relative max-w-2xl mx-auto">
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className="p-0 w-[240px] h-[200px] aspect-[6/5] relative overflow-hidden bg-transparent mx-auto">
                      <CardStart title={step.title} description={step.description} status={step.status} started={isPlaying || currentStep > 0} stepId={step.id} />
                    </div>


                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result display */}
          {currentStep >= steps.length - 1 && !isPlaying && (
            <div className="mt-8 workflow-completed-card text-center animate-bounce-in">
              <div className="workflow-completed-inner">
                <p className="font-bold text-white" style={{ fontSize: '12pt' }}>
                  Workflow completed! Successfully swapped SOL to USDC and deposited to Kamino Lend.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;