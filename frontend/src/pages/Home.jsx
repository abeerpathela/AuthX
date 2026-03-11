import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
      title: "Secure Authentication",
      desc: "Industry-grade JWT-based auth with encrypted sessions and brute-force protection.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      title: "Email Verification",
      desc: "OTP-based email verification keeps your accounts safe and verified at every step.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      title: "Password Recovery",
      desc: "Seamless password reset flow via secure email link with time-bound token expiry.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060b18] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Background glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Badge */}
        <span className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Trusted Auth Platform
        </span>

        {/* Logo */}
        <img src={assets.logo} alt="AuthX" className="h-20 w-auto mb-8 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]" />

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="text-white">Secure.</span>{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Verify.</span>{" "}
          <span className="text-white">Empower.</span>
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto text-lg mb-10 leading-relaxed">
          AuthX delivers enterprise-level authentication and identity verification in a clean, lightning-fast package. Your users deserve security they can trust.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 text-sm"
          >
            Get Started — It's Free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 rounded-full font-bold text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 text-sm"
          >
            Sign In
          </button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce text-gray-600">
          <span className="text-xs">Scroll down</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-[#070c1a]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3">Why AuthX?</p>
          <h2 className="text-center text-4xl font-extrabold text-white mb-14">
            Built for security, <span className="text-cyan-400">designed for simplicity</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-16 border-y border-white/5 bg-[#060b18]">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[["99.9%", "Uptime SLA"], ["256-bit", "AES Encryption"], ["< 200ms", "Auth Latency"]].map(([stat, label], i) => (
            <div key={i}>
              <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{stat}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px]" />
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-4 relative">
          Ready to secure your app?
        </h2>
        <p className="text-gray-400 mb-8 relative">Join thousands of developers who trust AuthX for their authentication needs.</p>
        <button
          onClick={() => navigate("/login")}
          className="relative px-10 py-4 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-xl shadow-cyan-500/30 hover:scale-105 text-sm"
        >
          Start for Free Today →
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-xs border-t border-white/5">
        © {new Date().getFullYear()} AuthX. All rights reserved. — Secure. Verify. Empower.
      </footer>
    </div>
  );
}

export default Home;