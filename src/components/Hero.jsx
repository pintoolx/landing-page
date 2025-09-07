import React, { useState, useEffect } from 'react';
import JoinWaitlistButton from './JoinWaitlistButton';

// PinTool 工作流程步驟
const workflowSteps = [
  {
    id: 1,
    title: "Monitor SOL price",
    description: "Pyth Price Feed monitor SOL price is greater than $250",
    icon: "📊",
    status: "waiting",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Unstake SOL",
    description: "Unstake SOL from Jito Staking",
    icon: "🔓",
    status: "pending",
    color: "bg-yellow-500"
  },
  {
    id: 3,
    title: "Token Swap",
    description: "Use Jupiter Swap to swap SOL to USDC",
    icon: "🔄",
    status: "pending",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Deposit to Kamino Lend",
    description: "Deposit USDC to Kamino Lend to earn yield",
    icon: "💰",
    status: "pending",
    color: "bg-green-500"
  },
  {
    id: 5,
    title: "Send Notification",
    description: "Send completion notification to Discord/Telegram",
    icon: "📢",
    status: "pending",
    color: "bg-pink-500"
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
    if (currentStep >= steps.length - 1) {
      resetDemo();
    }
    setIsPlaying(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'active': return 'bg-pink-500 text-white animate-pulse';
      case 'waiting': return 'bg-blue-500 text-white';
      default: return 'bg-gray-600 text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'active': return '⚡';
      case 'waiting': return '👁️';
      default: return '⏸️';
    }
  };

  return (
    <section className="relative overflow-hidden bg-gray-900 text-white py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
            No-Code DeFi Platform on <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Solana</span>
          </h1>
        </div>

        {/* 互動式工作流程演示 */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-4">
              <button 
                onClick={startDemo}
                disabled={isPlaying}
                className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'} px-8 py-3 hover-lift`}
              >
                {isPlaying ? 'Executing...' : currentStep >= steps.length - 1 ? 'Restart' : 'Start Demo'}
              </button>
              <button 
                onClick={resetDemo}
                className="btn btn-secondary px-8 py-3 hover-lift"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Desktop - horizontal layout */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="flex justify-between items-start">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative flex-1 max-w-xs">
                    {/* Step circle */}
                    <div className="flex justify-center mb-6">
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center neobrut-border ${getStatusColor(step.status)} transition-all duration-300`}>
                        <span className="text-2xl">
                          {step.status === 'completed' || step.status === 'active' ? getStatusIcon(step.status) : step.icon}
                        </span>
                      </div>
                    </div>
                    
                    {/* Step content */}
                    <div className={`p-4 neobrut-border transition-all duration-300 ${
                      step.status === 'active' ? 'bg-gray-700 neobrut-shadow-white' : 'bg-gray-800'
                    } ${index < steps.length - 1 ? 'mr-4' : ''}`}>
                      <div className="text-center mb-3">
                        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(step.status)}`}>
                          {step.status === 'completed' ? 'Completed' : 
                           step.status === 'active' ? 'Executing' :
                           step.status === 'waiting' ? 'Monitoring' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm text-center">{step.description}</p>
                      
                      {/* Progress bar */}
                      {step.status === 'active' && (
                        <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
                          <div className="bg-pink-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
                        </div>
                      )}
                    </div>

                    {/* Arrow (except the last one) */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-8 -right-2 transform -translate-y-1/2 z-20">
                        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="relative max-w-4xl mx-auto">
              {/* Vertical connection line */}
              <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gray-600 hidden md:block"></div>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative flex items-center">
                    {/* Step circle */}
                    <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center neobrut-border ${getStatusColor(step.status)} transition-all duration-300`}>
                      <span className="text-2xl">
                        {step.status === 'completed' || step.status === 'active' ? getStatusIcon(step.status) : step.icon}
                      </span>
                    </div>
                    
                    {/* Step content */}
                    <div className="ml-6 flex-1">
                      <div className={`p-6 neobrut-border transition-all duration-300 ${
                        step.status === 'active' ? 'bg-gray-700 neobrut-shadow-white' : 'bg-gray-800'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white">{step.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' ? 'Completed' : 
                             step.status === 'active' ? 'Executing' :
                             step.status === 'waiting' ? 'Monitoring' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-gray-300">{step.description}</p>
                        
                        {/* Progress bar */}
                        {step.status === 'active' && (
                          <div className="mt-4 w-full bg-gray-600 rounded-full h-2">
                            <div className="bg-pink-500 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result display */}
          {currentStep >= steps.length - 1 && !isPlaying && (
            <div className="mt-12 p-6 bg-green-500 neobrut-border neobrut-shadow-white text-center animate-bounce-in">
              <h3 className="text-2xl font-bold text-black mb-2">🎉 Workflow completed!</h3>
              <p className="text-gray-900">
                Successfully swapped SOL to USDC and deposited to Kamino Lend, and sent a completion notification.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;