"use client";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import { useState, useRef, useCallback, useEffect } from "react";
import useCheckPermission from "./draft/useCheckPermission";
import SquatRun from "./squatrun";
import CameraPermissionPrompt from "./CameraPermissionPrompt";
import Hold from "./hold";
import loadModel from "./model";
import * as poseDetection from "@tensorflow-models/pose-detection";
import React from "react";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

export default function Squat({ nReps }: { nReps: number }) {
  // const [reps, setReps] = useState(nReps);
  const [reps, setReps] = useState(5);
  // const [squatCount, setSquatCount] = useState(0);
  const [step, setStep] = useState(0);
  const [model, setModel] = useState<poseDetection.PoseDetector>();
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const [webcam, setWebcam] = useState<WebcamIterator | null>(null);
  // const [cameraPermission, setCameraPermission] = useState();

  const cameraPermission = useCheckPermission();

  useEffect(() => {
    if (step === 0 && cameraPermission === "granted") {
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraPermission]);

  useEffect(() => {
    const initModel = async () => {
      const modelInstance = await loadModel();
      setModel(modelInstance);
    };
    initModel();
  }, []);

  useEffect(() => {
    const initWebcam = async () => {
      if (!webcamRef.current) return;
      if (cameraPermission === "granted") {
        try {
          const initializedWebcam = await tf.data.webcam(webcamRef.current);
          setWebcam(initializedWebcam);
        } catch (error) {
          console.error("Error initializing webcam:", error);
        }
      }
    };
    initWebcam();
  }, [cameraPermission]);

  const handleStep = () => setStep((prevStep) => prevStep + 1);

  const handlePermissionGranted = async () => {
    handleStep();
    const initializedWebcam = await tf.data.webcam(webcamRef.current!);
    setWebcam(initializedWebcam);
  };

  console.log("render", Math.random());

  return (
    <>
      <video
        height={720}
        width={1280}
        autoPlay
        playsInline
        muted
        ref={webcamRef}
        className="w-full h-full object-cover fixed top-0 left-0 -scale-x-[1]"
        // hidden={step === 0}
      />

      {step === 0 && cameraPermission && cameraPermission !== "granted" && (
        <CameraPermissionPrompt onPermissionGranted={handlePermissionGranted} />
      )}

      {step === 1 && (
        <Hold webcam={webcam} model={model} onStepChange={handleStep} />
      )}

      {step === 2 && cameraPermission === "granted" && (
        <>
          <SquatRun
            onStepChange={handleStep}
            webcam={webcam}
            model={model}
            nReps={nReps}
            // squatCount={squatCount}
            // setSquatCount={setSquatCount}
          />
        </>
      )}
    </>
  );
}
