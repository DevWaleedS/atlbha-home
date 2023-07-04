import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../Context/AppContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoHeader } from "../../index";
import { ReactComponent as SvgComponent } from "../../../assets/Icons/Component 59 – 11.svg";
import { ReactComponent as SvgRepeat } from "../../../assets/Icons/Repeat.svg";
import CircleModal from "./CircleModal.jsx";
import AlertModal from "./AlertModal.jsx";

import OtpInput from "react-otp-input";
import "./SendVerifcationCodeBox.css";

const SendVerifcationCodeBox = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contextStore = useContext(AppContext);
  const {
    email,
    resendButtonDisabled,
    setResendButtonDisabled,
    setDisabledBtn,
    disapledBtn,
    showAlertModal,
    setShowAlertModal,
    message,
    setMessage,
  } = contextStore;
  const { setResetPasswordToken } = contextStore;
  const [codeValue, setCodeValue] = useState("");
  const [
    reSendVerificationCodeByEmailDisabled,
    setReSendVerificationCodeByEmailDisabled,
  ] = useState(false);
  const [showCircleModal, setShowCircleModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdown, setCountdown] = useState(60);

  // to resend by email
  useEffect(() => {
    // Start the countdown when resendButtonDisabled becomes true

    if (resendButtonDisabled) {
      const countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear the countdown timer when countdown reaches 0
      if (countdown === 0) {
        setShowCircleModal(false);
        clearInterval(countdownTimer);
        setResendButtonDisabled(false);
        setReSendVerificationCodeByEmailDisabled(false);
      }

      // Clean up the countdown timer when the component unmounts
      return () => {
        clearInterval(countdownTimer);
      };
    }
  }, [resendButtonDisabled, countdown]);

  // -------------------------------------------------------------------------------------------------- //

  // SEND VERIFY CODE BY EMAIL AND CODE
  const verifyCode = () => {
    const formData = new FormData();
    formData.append("user_name", email);
    formData.append("code", codeValue);

    axios
      .post("https://backend.atlbha.com/api/password/verify", formData)
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setResetPasswordToken(res?.data?.data?.token);
          navigate("/CreateNewPasswordPage");
        } else {
          console.log(res?.data?.message?.en?.user_name?.[0]);
        }
      });
  };

  //  RE-SEND VERIFY CODE BY PHONE
  const reSendVerificationCodeByPhone = () => {
    const formData = new FormData();
    formData.append("user_name", email);
    axios
      .post("https://backend.atlbha.com/api/password/create", formData)
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setMessage("تم إرسال الكود إلى هاتفك");
          setShowAlertModal(true);
          setResendButtonDisabled(true);
          setDisabledBtn(true);
          setCountdown(60);
        } else {
          console.log(res?.data?.message?.en?.user_name?.[0]);
        }
      });
  };

  //  RE-SEND VERIFY CODE BY EMAIL
  const reSendVerificationCodeByEmail = () => {
    const formData = new FormData();
    formData.append("user_name", email);

    axios
      .post("https://backend.atlbha.com/api/password/create-by-email", formData)
      .then((res) => {
        if (res?.data?.success === true && res?.data?.data?.status === 200) {
          setMessage("تم إرسال الكود إلى البريد الإلكتروني");
          setShowAlertModal(true);
          setReSendVerificationCodeByEmailDisabled(true);
          setCountdown(60);
        } else {
          console.log(res?.data?.message?.en?.user_name?.[0]);
        }
      });

    // Wait for one minute before enabling the button again
    setTimeout(() => {
      setShowCircleModal(false);
    }, 600000);
  };

  // to close Alert modal after timer end
  useEffect(() => {
    if (showAlertModal) {
      setTimeout(() => {
        setShowAlertModal(false);
      }, 3000);
    }
  }, [showAlertModal]);

  // to create circle timer
  useEffect(() => {
    // Update the current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (location.pathname === "/SendVerifcationCodeBox") {
    document.querySelector("body").style.overflow = "hidden";
  }

  return (
    <>
      <div className="verificationBox-box" dir="ltr">
        <div className="all-content" dir="rtl">
          <div className="box-container-form">
            <LogoHeader />
            <div className="all">
              <h2>قم بإدخال كود التحقق </h2>
              <div className="box">
                <OtpInput
                  onChange={(e) => setCodeValue(e)}
                  value={codeValue}
                  numInputs={6}
                  className={"input"}
                />
              </div>

              <button
                className="mb-2 resend-code-btn"
                disabled={resendButtonDisabled}
                onClick={reSendVerificationCodeByPhone}
              >
                <span>
                  <SvgRepeat style={{ width: "20px", marginLeft: "3px" }} />
                </span>
                اعد ارسال الكود
                <span className={`${disapledBtn ? "d-inline" : "d-none"}`}>
                  {" "}
                  {countdown === 0 ? " " : countdown}{" "}
                </span>
              </button>
              <button
                className="send-by-email-btn"
                disabled={reSendVerificationCodeByEmailDisabled}
                onClick={reSendVerificationCodeByEmail}
              >
                ارسل الكود عبر البريد الالكتروني
              </button>

              <button className="bt-main" onClick={verifyCode}>
                تأكيد
              </button>
            </div>
          </div>

          <div className="box-form-banner">
            <div className="info-svg">
              <h4>كود التحقق</h4>

              <span>
                <SvgComponent />
              </span>
            </div>
          </div>
        </div>
      </div>
      <CircleModal
        countdown={countdown}
        show={showCircleModal}
        closeModal={() => setShowCircleModal(false)}
      />
      <AlertModal show={showAlertModal} message={message} />
    </>
  );
};

export default SendVerifcationCodeBox;
