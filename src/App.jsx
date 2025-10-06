import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative font-mono min-h-screen bg-[#E4EAF2] lg:bg-[url('/images/background.svg')] lg:bg-no-repeat lg:bg-top lg:bg-[length:100%_auto] overflow-hidden">
      <div className="mx-auto w-full max-w-[375px] min-w-[375px] lg:max-w-none lg:min-w-0 bg-[url('/images/background.svg')] bg-no-repeat bg-top bg-[length:100%_auto] lg:bg-none">
        <Header />
        <main>
          <Hero />
          <Features />
          <Waitlist />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;