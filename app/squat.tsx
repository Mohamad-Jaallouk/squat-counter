"use client";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import { useState, useRef, useEffect } from "react";
import useCheckPermission from "./hooks/useCheckPermission";
import SquatRun from "./squatrun";
import StandUpCheck from "./standUpCheck";
import React from "react";
import Card2 from "./card2";
import CameraIcon from "./icons/camera";
import { motion } from "framer-motion";
import LoadingSpinner from "./icons/loading-spinner";
import { useModel } from "./hooks/usemodel";
import useWebcam from "./hooks/useWebcam";

export default function Squat({ nReps }: { nReps: number }) {
  const [step, setStep] = useState(0);
  const webcamRef = useRef<HTMLVideoElement | null>(null);

  const cameraPermission = useCheckPermission();
  const model = useModel();
  const webcam = useWebcam(webcamRef, cameraPermission);

  if (step === 0 && cameraPermission === "granted") {
    setStep(1);
  }

  const handleStep = () => setStep((prevStep) => prevStep + 1);

  const handlePermissionGranted = async () => {
    handleStep();
    await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: 1280,
        height: 720,
      },
    });
  };

  console.log("render", Math.random());

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <video
        height={720}
        width={1280}
        autoPlay
        playsInline
        muted
        ref={webcamRef}
        className="fixed top-0 left-0 h-full w-full -scale-x-[1] object-cover"
        hidden={step === 0}
      />

      {!cameraPermission && (
        <>
          <LoadingSpinner className="h-12 w-12 animate-spin text-gray-500" />
        </>
      )}

      {step === 0 && cameraPermission && cameraPermission !== "granted" && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card2
              large={true}
              title={
                "We need access to your camera. Would you like to grant access?"
              }
              description={""}
              demo={<CameraIcon />}
              demo2={
                <>
                  <button
                    className="text-l group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 font-bold text-white transition-colors hover:bg-white hover:text-black"
                    onClick={handlePermissionGranted}
                  >
                    Grant access
                  </button>
                </>
              }
            ></Card2>
          </motion.div>
        </>
      )}

      {step === 1 && cameraPermission === "granted" && (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <StandUpCheck
            webcam={webcam}
            model={model}
            onStepChange={handleStep}
          />
        </motion.div>
      )}

      {step === 2 && cameraPermission === "granted" && (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <SquatRun
            onStepChange={handleStep}
            webcam={webcam}
            model={model}
            nReps={nReps}
          />
        </motion.div>
      )}
    </>
  );
}
