"use client";

import "@tensorflow/tfjs-backend-cpu";
import { useState, useRef, useCallback, useEffect } from "react";
import useModel from "./useModel";
import useWebcam from "./useWebcam";
import useCheckPermission from "./useCheckPermission";
import SquatRun from "./squatrun";
import CameraPermissionPrompt from "./CameraPermissionPrompt";

export default function Squat({ nReps }: { nReps: number }) {
  const [reps, setReps] = useState(nReps);
  const [squatCount, setSquatCount] = useState(0);
  const [step, setStep] = useState(0);

  const model = useModel();

  const cameraPermission = useCheckPermission();
  const webcamEnabled = cameraPermission === "granted";
  const { webcamRef, webcam } = useWebcam(webcamEnabled);

  const getCameraAccess = () => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
  };

  const handlePermissionGranted = () => {
    getCameraAccess();
    setStep(step + 1);
  };

  return (
    <>
      <video
        autoPlay
        playsInline
        muted
        ref={webcamRef}
        className="w-full h-full object-cover fixed top-0 left-0 -scale-x-[1]"
      />

      {step === 0 && cameraPermission && cameraPermission !== "granted" && (
        <CameraPermissionPrompt onPermissionGranted={handlePermissionGranted} />
      )}

      {cameraPermission === "granted" &&
        (squatCount < 5 ? (
          <>
            <div className="text-7xl relative">
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
