import React, { useEffect, useRef } from 'react';
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
        className="absolute bg-[#e4eaf2] box-border content-stretch flex flex-col gap-[10px] inset-[41.04%_80.22%_40.82%_4.68%] items-center justify-center px-[8px] py-[13px] rounded-[80px]"
        data-node-id="I12:529;12:104"
      />
      <p
        className="absolute bottom-[77.28%] text-2xl font-bold font-['Space_Grotesk'] leading-[normal] left-[16.9%] right-0 text-[24px] text-center text-white top-[15.5%]"
        data-node-id="I12:529;12:292"
      >
        {title}
      </p>
      <p
        className="absolute text-base font-semibold font-['Space_Grotesk'] inset-[51.67%_25%_33.33%_40%] leading-[normal] not-italic text-center text-white"
        data-node-id="I12:529;12:293"
      >
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="pt-12 lg:py-16 lg:mt-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-[33px] lg:mb-16">
          <h2 className="text-2xl lg:text-7xl font-bold font-['Space_Grotesk'] leading-[1.2] text-black">
            Code for detail, UI for ease
          </h2>
        </div>
        
        {/* 手機：橫向捲動三張示意圖 */}
        <div className="lg:hidden">
          <MobileScroller />
        </div>

        {/* 桌面：維持原有三欄卡片 */}
        <div className="hidden lg:grid lg:grid-cols-[repeat(3,381px)] justify-center gap-x-[20px] gap-y-8">
          {features.map((feature) => (
            <div key={feature.title} className="group flex justify-center">
              <div className="p-0 w-[381px] h-[317px] relative overflow-hidden">
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

// 手機版橫向捲動：預設置中顯示 Dashboard
const MobileScroller = () => {
  const trackRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const dash = dashboardRef.current;
    if (!track || !dash) return;
    // 將 Dashboard 置中於可視範圍
    const container = track; // overflow 容器
    // track 是 overflow 容器本身
    const dashboardOffset = dash.offsetLeft;
    const centerScrollLeft = Math.max(
      0,
      dashboardOffset - (container.clientWidth - dash.clientWidth) / 2
    );
    const BIAS_RIGHT_PX = 16; // 輕微向右偏移
    container.scrollLeft = centerScrollLeft + BIAS_RIGHT_PX;
  }, []);

  return (
    <div className="relative w-full">
      <div ref={trackRef} className="flex gap-4 overflow-x-auto no-scrollbar px-4 -mx-4">
        <img src="/images/noti.svg" alt="Notifications" className="shrink-0 w-[200px] h-[240px] object-contain" />
        <img ref={dashboardRef} src="/images/dashboard.svg" alt="Dashboard" className="shrink-0 w-[200px] h-[240px] object-contain" />
        <img src="/images/builder.svg" alt="Builder" className="shrink-0 w-[200px] h-[240px] object-contain" />
      </div>
    </div>
  );
};