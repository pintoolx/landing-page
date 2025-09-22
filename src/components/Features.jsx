import React from 'react';
import { LayoutDashboard, Workflow, Zap } from 'lucide-react';

// PinTool 的三大核心功能
const features = [
  {
    title: "All-in-One Dashboard",
    description: "Manage all your DeFi activities from one powerful interface.",
    icon: <LayoutDashboard className="w-16 h-16" />,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    title: "Visual Strategy Builder",
    description: "Create complex DeFi workflows with simple drag-and-drop.",
    icon: <Workflow className="w-16 h-16" />,
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    title: "Smart Notifications",
    description: "Automate your DeFi strategies with custom triggers and get notified via Email or Telegram.",
    icon: <Zap className="w-16 h-16" />,
    gradient: "from-violet-500 to-purple-600"
  }
];

const Features = () => {
  return (
    <section className="py-16" style={{ backgroundColor: '#041131' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-white">
          Code for detail, UI for ease
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={feature.title} className="group">
              {/* 功能卡片 */}
              <div className="feature-card-neumorphism p-8 h-full flex flex-col">
                {/* 圖標區域 */}
                <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} w-fit mx-auto`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                {/* 標題和描述 */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-4 gradient-text">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;