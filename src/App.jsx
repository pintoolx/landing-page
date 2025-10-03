import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import Background from './components/Background';

function App() {
  return (
    <div className="relative font-mono min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Background />
      </div>
      <Header />
      <main>
        <Hero />
        <Features />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

export default App;