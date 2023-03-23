"use client";

import "@tensorflow/tfjs-backend-cpu";
import { useState, useRef, useCallback, useEffect } from "react";
import useModel from "./useModel";
import useWebcam from "./useWebcam";
import useCameraPermission from "./useCameraPermission";
import SquatRun from "./squatrun";

export default function Squat({ nReps }: { nReps: number }) {
  const [reps, setReps] = useState(nReps);
  const [squatCount, setSquatCount] = useState(0);

  const model = useModel();

  const cameraPermission = useCameraPermission();
  const webcamEnabled = cameraPermission === "granted";
  const { webcamRef, webcam } = useWebcam(webcamEnabled);

  const GetCameraAccess = () => {
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
    }, []);
    return null;
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
