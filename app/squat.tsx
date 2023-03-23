"use client";

import "@tensorflow/tfjs-backend-cpu";
import { useState, useRef, useCallback, useEffect } from "react";
import useModel from "./useModel";
import useWebcam from "./useWebcam";
import useCameraPermission from "./useCameraPermission";
import SquatRun from "./squatrun";

export default function Squat({ nReps = 5 }: { nReps: number }) {
  const [reps, setReps] = useState(nReps);
  const [squatCount, setSquatCount] = useState(0);

  const model = useModel();

  const cameraPermission = useCameraPermission();
  const webcamEnabled = cameraPermission === "granted";
  const { webcamRef, webcam } = useWebcam(webcamEnabled);

  const GetCameraAccess = () => {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
    return null;
  };

  const toggleFullScreen = () => {
    if (webcamRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        webcamRef.current.requestFullscreen();
      }
    }
  };

  return (
    <>
      <video
        autoPlay
        playsInline
        muted
        ref={webcamRef}
        onClick={toggleFullScreen}
      />

      {cameraPermission !== "granted" && (
        <>
          <h1 className="text-3xl font-bold underline">
            Please allow camera access...
          </h1>
          <GetCameraAccess />
        </>
      )}

      {cameraPermission === "granted" &&
        (squatCount < 5 ? (
          <>
            {" "}
            <h1>Access granted!</h1>
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
            <h1>Great job! You've completed your workout!</h1>
          </>
        ))}
    </>
  );
}
