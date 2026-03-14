import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function EmailVerify() {

  const { backendUrl, getUserData } = useContext(AppContext);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  // Handle typing
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, index) => {
      if (inputs.current[index]) {
        inputs.current[index].value = digit;
      }
    });
  };

  // Submit OTP
  const handleSubmit = async () => {

    const otpValue = otp.join("");

    try {

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp: otpValue },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData(); // refresh user data
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="border border-gray-600 rounded-xl p-8 w-[380px] text-center">

        <h2 className="text-xl font-semibold mb-2">Verify Your Email</h2>

        <p className="text-gray-400 text-sm mb-6">
          A 6 digit OTP code has been sent to your mail
        </p>

        <div
          className="flex justify-between gap-3 mb-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg rounded-md bg-[#2f3555] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 transition text-white py-2 rounded-lg"
        >
          Submit
        </button>

      </div>

    </div>
  );
}

export default EmailVerify;