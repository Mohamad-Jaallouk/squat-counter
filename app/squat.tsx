"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import useCheckPermission from "./hooks/useCheckPermission";
import useWebcam from "./hooks/useWebcam";
import StandUpCheck from "./standUpCheck";
import SquatRun from "./squatrun";
import CardGrantAccess from "./components/cardGrantAccess";
import CameraIcon from "./icons/camera";
import LoadingSpinner from "./icons/loading-spinner";
import useModel from "./hooks/usemodel";
import Reps from "./components/reps";
import Countdown from "./components/countDown";
import Confetti from "react-confetti";

const videoConfig = {
  height: 720,
  width: 1280,
  facingMode: "user",
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Squat() {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const [step, setStep] = useState(0);
  const [reps, setReps] = useState(0);

  const cameraPermission = useCheckPermission();
  const model = useModel();
  const webcam = useWebcam(webcamRef, cameraPermission);

  const handleStep = () => setStep((prevStep) => prevStep + 1);

  if (step === 1 && cameraPermission === "granted") {
    handleStep();
  }

  const handlePermissionGranted = async () => {
    handleStep();
    await navigator.mediaDevices.getUserMedia({ video: videoConfig });
  };

  const handleReps = (reps: number) => {
    handleStep();
    setReps(reps);
  };

  return (
    <>
      <video
        {...videoConfig}
        autoPlay
        playsInline
        muted
        ref={webcamRef}
        className="fixed top-0 left-0 h-full w-full -scale-x-[1] object-cover"
        hidden={step === 0}
      />

      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Reps
            title={"How many squat reps would you like to perform?"}
            button1={<button onClick={() => handleReps(10)}>10</button>}
            button2={<button onClick={() => handleReps(20)}>20</button>}
            button3={<button onClick={() => handleReps(50)}>50</button>}
            button4={<button onClick={() => handleReps(100)}>100</button>}
          ></Reps>
        </motion.div>
      )}

      {step > 0 && !cameraPermission && (
        <>
          <LoadingSpinner className="h-12 w-12 animate-spin text-gray-500" />
        </>
      )}

      {step === 1 && cameraPermission && cameraPermission !== "granted" && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CardGrantAccess
              title={
                "We need access to your camera. Would you like to grant access?"
              }
              icon={<CameraIcon />}
              button={
                <button onClick={handlePermissionGranted}>Grant access</button>
              }
            ></CardGrantAccess>
          </motion.div>
        </>
      )}

      {step === 2 && cameraPermission === "granted" && (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <StandUpCheck
            webcam={webcam}
            model={model}
            onStepChange={handleStep}
          />
        </motion.div>
      )}

      {step === 3 && cameraPermission === "granted" && (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Countdown onStepChange={handleStep} />
        </motion.div>
      )}

      {step === 4 && cameraPermission === "granted" && (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <SquatRun
            onStepChange={handleStep}
            webcam={webcam}
            model={model}
            nReps={reps}
          />
        </motion.div>
      )}

      {step === 5 && <Confetti />}
    </>
  );
}
