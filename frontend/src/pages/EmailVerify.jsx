import React, { useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function EmailVerify() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (e, index) => {
    const val = e.target.value;
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    paste.split("").forEach((char, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = char;
      }
    });
    const lastIndex = Math.min(paste.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((r) => r?.value || "").join("");
    if (otp.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-account`,
        { otp },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Email verified successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Verification failed.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b18] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={assets.logo}
              alt="AuthX"
              className="h-12 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-white text-center mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            Enter the 6-digit OTP sent to your registered email address.
          </p>

          <form onSubmit={onSubmitHandler}>
            {/* OTP Inputs */}
            <div className="flex gap-2.5 justify-center mb-7" onPaste={handlePaste}>
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onInput={(e) => handleInput(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-11 h-13 text-center text-lg font-bold text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:bg-cyan-500/5 transition-all duration-200 caret-cyan-400"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify Email →"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-600">
            Didn't receive the code?{" "}
            <button className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Resend OTP
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-700 mt-6">
          Protected by AuthX — <span className="text-cyan-900">Secure. Verify. Empower.</span>
        </p>
      </div>
    </div>
  );
}

export default EmailVerify;