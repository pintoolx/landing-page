import React, { useState, useEffect } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';
import { ChartNoAxesCombined, Unlock, RefreshCw, DollarSign, Bell, Eye, Zap, CheckCircle, Pause } from 'lucide-react';
import { trackStartDemo } from '../utils/analytics';

// PinTool 工作流程步驟
const workflowSteps = [
  {
    id: 1,
    title: "Monitor SOL price",
    description: "Pyth Price Feed monitor SOL price is greater than $250",
    icon: ChartNoAxesCombined,
    status: "waiting",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Unstake SOL",
    description: "Unstake SOL from Jito Staking",
    icon: Unlock,
    status: "pending",
    color: "bg-blue-500"
  },
  {
    id: 3,
    title: "Token Swap",
    description: "Use Jupiter Swap to swap SOL to USDC",
    icon: RefreshCw,
    status: "pending",
    color: "bg-indigo-500"
  },
  {
    id: 4,
    title: "Deposit to Kamino Lend",
    description: "Deposit USDC to Kamino Lend to earn yield",
    icon: DollarSign,
    status: "pending",
    color: "bg-cyan-500"
  },
  {
    id: 5,
    title: "Send Notification",
    description: "Send completion notification to Discord/Telegram",
    icon: Bell,
    status: "pending",
    color: "bg-sky-500"
  }
];

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-500/25';
      case 'active': return 'bg-gradient-to-br from-violet-400 to-purple-500 text-white animate-pulse shadow-lg shadow-violet-500/30';
      case 'waiting': return 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-500/25';
      default: return 'bg-gradient-to-br from-slate-500 to-gray-600 text-gray-300 shadow-lg shadow-slate-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6" />;
      case 'active': return <Zap className="w-6 h-6" />;
      case 'waiting': return <Eye className="w-6 h-6" />;
      default: return <Pause className="w-6 h-6" />;
    }
  };

  return (
    <section className="relative text-white py-16 md:py-24" style={{ backgroundColor: '#041131' }}>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
            No-Code DeFi Platform on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Solana</span>
          </h1>
        </div>

        {/* 互動式工作流程演示 */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-4">
              <JoinWaitlistButton 
                onClick={startDemo}
                size="large"
                disabled={isPlaying}
              >
                {isPlaying ? 'Executing...' : currentStep >= steps.length - 1 ? 'Restart' : 'Start Demo'}
              </JoinWaitlistButton>
            </div>
          </div>

          {/* Desktop - horizontal layout */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="grid grid-cols-5 gap-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className="workflow-card-container">
                      <div className="workflow-card-inner">
                        {/* Icon Header */}
                        <div className="workflow-card-header">
                          <div className={`workflow-card-icon ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' || step.status === 'active' ? getStatusIcon(step.status) : <step.icon className="w-6 h-6" />}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="workflow-card-content">
                          <h3 className="workflow-card-title">{step.title}</h3>
                          <p className="workflow-card-description">{step.description}</p>

                          {/* Status */}
                          <div className={`workflow-card-status ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' ? 'Completed' :
                              step.status === 'active' ? 'Executing' :
                                step.status === 'waiting' ? 'Monitoring' : 'Pending'}
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Arrow (except the last one) */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-1/2 -right-[18px] transform -translate-y-1/2 z-20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    )}
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
                    <div className="workflow-card-container">
                      <div className="workflow-card-inner">
                        {/* Icon Header */}
                        <div className="workflow-card-header">
                          <div className={`workflow-card-icon ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' || step.status === 'active' ? getStatusIcon(step.status) : <step.icon className="w-6 h-6" />}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="workflow-card-content">
                          <h3 className="workflow-card-title text-lg">{step.title}</h3>
                          <p className="workflow-card-description">{step.description}</p>

                          {/* Status */}
                          <div className={`workflow-card-status ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' ? 'Completed' : 
                             step.status === 'active' ? 'Executing' :
                                step.status === 'waiting' ? 'Monitoring' : 'Pending'}
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Down arrow (except the last one) */}
                    {index < steps.length - 1 && (
                      <div className="flex justify-center mt-4">
                        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    )}
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