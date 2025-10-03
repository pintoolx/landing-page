import React from 'react';
import Vector from '/images/Vector.svg';
// PinTool 的三大核心功能
const features = [
  {
    title: "All-in-One Dashboard",
    description: "Manage all your DeFi activities from one powerful interface."
  },
  {
    title: "Visual Strategy Builder",
    description: "Create complex DeFi workflows with simple drag-and-drop."
  },
  {
    title: "Smart Notifications",
    description: "Automate your DeFi strategies with custom triggers and get notified via Email or Telegram."
  }
];

// 新樣式：CardStart（維持動態標題與敘述）
const CardStart = ({ title, description }) => {
  return (
    <div className="relative size-full" data-name="Card/Start" data-node-id="12:529">
      <div className="absolute inset-0" data-name="Vector" data-node-id="I12:529;12:103">
        <img alt="" className="block max-w-none size-full" src={Vector} />
      </div>
      <div
        className="absolute border border-[#e4eaf2] border-solid box-border content-stretch flex flex-col gap-[10px] inset-[41.04%_80.22%_40.82%_4.68%] items-center justify-center px-[8px] py-[13px] rounded-[80px]"
        data-node-id="I12:529;12:104"
      />
      <p
        className="absolute bottom-[77.28%] font-['Space_Grotesk:SemiBold',_sans-serif] font-bold leading-[normal] left-[16.9%] right-0 text-[24px] text-center text-white top-[15.5%]"
        data-node-id="I12:529;12:292"
      >
        {title}
      </p>
      <p
        className="absolute font-['Space_Grotesk:SemiBold',_sans-serif] inset-[51.67%_16.9%_38.33%_33.8%] leading-[normal] not-italic text-[14px] text-center text-white"
        data-node-id="I12:529;12:293"
      >
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-black">
          Code for detail, UI for ease
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="group">
              <div className="p-0 w-[381px] h-[317px] shrink-0 aspect-[381/317] relative overflow-hidden">
                <CardStart title={feature.title} description={feature.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;