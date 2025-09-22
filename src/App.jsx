import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-900 font-mono">
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