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
  const [reps, setReps] = useState(nReps);
  const [squatCount, setSquatCount] = useState(0);
  const [step, setStep] = useState(0);
  const [model, setModel] = useState<poseDetection.PoseDetector | undefined>();
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const [webcam, setWebcam] = useState<WebcamIterator | null>(null);
  // const [cameraPermission, setCameraPermission] = useState();

  const cameraPermission = useCheckPermission();

  useEffect(() => {
    async function runLoadModel() {
      const model = await loadModel();
      setModel(model);
    }
    runLoadModel();
  }, []);

  useEffect(() => {
    async function runLoadWebcam() {
      if (!webcamRef.current) return;
      if (cameraPermission === "granted") {
        try {
          const initializedWebcam = await tf.data.webcam(webcamRef.current);
          setWebcam(initializedWebcam);
        } catch (error) {
          console.error("Error initializing webcam:", error);
        }
      }
    }
    runLoadWebcam();
  }, [cameraPermission]);

  function handleStep() {
    setStep((prevStep) => prevStep + 1);
  }

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

      {/* {step === 1 && <h1 className="text-7xl relative">123</h1>}

      {step === 1 && (
        <Hold webcam={webcam} model={model} onStepChange={handleStep} />
      )} */}

      {step === 2 &&
        cameraPermission === "granted" &&
        (squatCount < 5 ? (
          <>
            <div className="text-7xl relative">
              <h1>step: {step}</h1>
              <h1>Access granted!</h1>
            </div>
            <SquatRun
              webcam={webcam}
              model={model}
              squatCount={squatCount}
              setSquatCount={setSquatCount}
            />
          </>
        ) : (
          <>
            <h1>Access granted!</h1>
            <h1>Great job! You have completed your workout!</h1>
          </>
        ))}
    </>
  );
}
