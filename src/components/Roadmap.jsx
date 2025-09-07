import React from 'react';

const roadmapItems = [
  {
    quarter: "2025 Q3",
    title: "MVP Launch",
    description: "Complete workflow for swap and stake strategies",
    status: "upcoming",
    features: [
      "Core DeFi dashboard",
      "Basic visual editor",
      "Swap & stake automation",
      "Essential integrations"
    ]
  },
  {
    quarter: "2025 Q4",
    title: "Enhanced Platform",
    description: "Multiple signal sources and expanded workflow nodes",
    status: "planned",
    features: [
      "Multiple data sources",
      "Advanced workflow nodes",
      "Custom trigger conditions",
      "Expanded protocol support"
    ]
  },
  {
    quarter: "2026 Q1",
    title: "Mobile Support",
    description: "Solana Mobile integration for on-the-go DeFi management",
    status: "planned",
    features: [
      "Solana Mobile app",
      "Mobile-optimized interface",
      "Push notifications",
      "Biometric security"
    ]
  },
  {
    quarter: "2026 Q2",
    title: "Creator Program",
    description: "Universal data integration and creator growth program",
    status: "planned",
    features: [
      "Any data source integration",
      "Creator Growth Program",
      "Revenue sharing model",
      "Community marketplace"
    ]
  }
];

const Roadmap = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-white">
            Development Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our journey to becoming the leading no-code DeFi platform on Solana
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmapItems.map((item, index) => (
            <div key={item.quarter} className="relative animate-slide-in-up" style={{animationDelay: `${index * 0.15}s`}}>
              <div className={`p-6 neobrut-border neobrut-shadow-white h-full flex flex-col hover-lift transition-all duration-300 ${
                item.status === 'upcoming' ? 'bg-pink-500 animate-glow' : 'bg-gray-800'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full transition-all duration-300 ${
                    item.status === 'upcoming' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {item.quarter}
                  </span>
                  {item.status === 'upcoming' && (
                    <span className="text-2xl animate-bounce">🚀</span>
                  )}
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${
                  item.status === 'upcoming' ? 'text-black' : 'text-white'
                }`}>
                  {item.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  item.status === 'upcoming' ? 'text-gray-900' : 'text-gray-300'
                }`}>
                  {item.description}
                </p>
                
                <ul className="space-y-2 mt-auto">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`text-sm flex items-start animate-bounce-in ${
                      item.status === 'upcoming' ? 'text-gray-900' : 'text-gray-400'
                    }`} style={{animationDelay: `${(index * 0.15) + (featureIndex * 0.05)}s`}}>
                      <svg className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                        item.status === 'upcoming' ? 'text-gray-900' : 'text-green-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {index < roadmapItems.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-pink-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
