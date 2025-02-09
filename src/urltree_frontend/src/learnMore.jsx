import React from 'react';

function App() {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 text-white min-h-screen">
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">URLTREE</h1>
        <p className="text-lg text-purple-200">Your decentralized links on the ICP blockchain.</p>
      </header>

      <section className="container mx-auto px-4 text-center mb-12">
        <p className="text-xl text-purple-100 mb-8">
          Organize and share all your important links securely, transparently, and in a decentralized way with URLTREE. Built on the ICP blockchain, we offer privacy, immutability, and full control over your data.
        </p>
        <a onClick={() => (window.location.href = "/")} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
          Get Started
        </a>
      </section>

      <section className="bg-purple-800/50 py-12">
        <div className="container mx-auto px-4 flex flex-wrap justify-center items-center">
          <h2 className="text-3xl font-bold text-center mb-8 w-full">Why Choose URLTREE?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-blue-900/50 p-6 rounded-lg w-80 text-center">
              <h3 className="text-xl font-semibold mb-2">Decentralization</h3>
              <p className="text-purple-200">Your links and data are stored in a decentralized way, with no reliance on centralized servers.</p>
            </div>
            <div className="bg-blue-900/50 p-6 rounded-lg w-80 text-center">
              <h3 className="text-xl font-semibold mb-2">Security</h3>
              <p className="text-purple-200">The ICP blockchain ensures your data is immutable and protected against censorship.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="text-center w-64">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect Your ICP Wallet</h3>
            <p className="text-purple-200">Use your favorite wallet to access URLTREE.</p>
          </div>
          <div className="text-center w-64">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Add Your Links</h3>
            <p className="text-purple-200">Enter all the links you want to share.</p>
          </div>
          <div className="text-center w-64">
            <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Your URLTREE</h3>
            <p className="text-purple-200">Share your page with the world.</p>
          </div>
        </div>
      </section>

      <footer className="bg-purple-900/50 py-6 text-center">
        <p className="text-purple-200">URLTREE.</p>
      </footer>
    </div>
  );
};

export default App;
