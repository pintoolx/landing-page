import React from 'react';

// PinTool 的三大核心功能
const features = [
  {
    title: "All-in-One DeFi Dashboard",
    description: "Manage all your DeFi activities from a single, unified interface. No more juggling between multiple platforms.",

    image: "https://via.placeholder.com/600x400/6366F1/FFFFFF?text=DeFi+Dashboard",
    imageAlt: "All-in-One DeFi Dashboard"
  },
  {
    title: "No-Code Visual Editor",
    description: "Build sophisticated DeFi strategies using our drag-and-drop interface. No coding skills required.",
    points: [
      "Visual workflow builder",
      "Pre-built strategy templates",
      "Drag-and-drop components",
      "Real-time strategy testing"
    ],
    image: "https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Visual+Editor",
    imageAlt: "No-Code Visual Editor"
  },
  {
    title: "Smart Triggers & Notifications",
    description: "Automate your DeFi strategies with custom triggers and get notified via Discord or Telegram.",
    points: [
      "Price-based trigger conditions",
      "Automated on-chain actions",
      "Discord & Telegram alerts",
      "Custom notification rules"
    ],
    image: "https://via.placeholder.com/600x400/10B981/FFFFFF?text=Smart+Triggers",
    imageAlt: "Smart Triggers & Notifications"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-white">
            Three Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            PinTool simplifies DeFi with three core capabilities that work together seamlessly
          </p>
        </div>
        
        {features.map((feature, index) => (
          <div key={feature.title} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} ${index > 0 ? 'mt-20' : ''} animate-slide-in-up`}>
            <div className="md:w-1/2">
              <div className="p-4 bg-gray-800 neobrut-border neobrut-shadow-white hover-lift">
                <img src={feature.image} alt={feature.imageAlt} className="w-full h-auto neobrut-border" />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-4 gradient-text">{feature.title}</h3>
              <p className="text-lg text-gray-300 mb-6">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;