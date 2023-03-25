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
import Card from "./card";
import CameraIcon from "./cameraIcon";
import GrantAccess from "./grantAccess";

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
        hidden={step === 0}
      />

      {step === 0 && cameraPermission && cameraPermission !== "granted" && (
        <>
          <Card
            large={true}
            title={
              "We need access to your camera. Would you like to grant access?"
            }
            description={""}
            demo={<CameraIcon />}
            demo2={
              <>
                <button
                  className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-l text-white transition-colors hover:bg-white hover:text-black font-bold"
                  onClick={handlePermissionGranted}
                >
                  Grant access
                </button>
                {/* <p>Grant access</p> */}
              </>
            }
          ></Card>
          {/* <CameraPermissionPrompt
            onPermissionGranted={handlePermissionGranted}
          /> */}
        </>
      )}

      {/* <div className="flex w-full flex-col items-end ">
        <div
          className={
            "relative col-span-1 overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800"
          }
        >
          <h1 className="text-7xl relative text-red-600">123</h1>
        </div>
      </div> */}

      {step === 1 && cameraPermission === "granted" && (
        <>
          <div className="absolute rounded-xl border border-gray-200 bg-white shadow-md flex flex-row items-end top-0 right-0 m-2">
            <h1 className="text-7xl relative text-red-600">123</h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 mx-2 mb-14 lg:my-2  rounded-xl border border-gray-200 bg-white shadow-md">
            <h1 className="text-7xl relative text-red-600 text-center">456</h1>
          </div>
        </>
      )}

      {step === 10 && cameraPermission === "granted" && (
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
