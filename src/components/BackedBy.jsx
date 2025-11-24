import React from 'react';

const BackedBy = () => {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-black text-xl lg:text-3xl font-bold font-['Space_Grotesk'] mb-8 lg:mb-12">
            Backed By
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Solana Foundation Logo */}
            <div className="flex items-center justify-center">
              <img 
                src="/images/solanaFoundationLogo.svg" 
                alt="Solana Foundation" 
                className="h-12 lg:h-14 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            
            {/* Superteam JP Logo */}
            <div className="flex items-center justify-center">
              <img 
                src="/images/superteam-jp.svg" 
                alt="Superteam JP" 
                className="h-12 lg:h-14 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            
            {/* Gateway Logo */}
            <div className="flex items-center justify-center">
              <img 
                src="/images/Lockup_Dark.svg" 
                alt="Gateway" 
                className="h-10 lg:h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
          
          <p className="text-center text-black/70 text-sm lg:text-base font-['Space_Grotesk'] mt-6 lg:mt-8">
            Supported by leading blockchain organizations
          </p>
        </div>
      </div>
    </section>
  );
};

export default BackedBy;

