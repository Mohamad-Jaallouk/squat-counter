"use client";

import "@tensorflow/tfjs-backend-cpu";
import Form from "./form";
import { useState, useRef, useCallback, useEffect } from "react";
import useModel from "./useModel";
import useWebcam from "./useWebcam";
import useCameraPermission from "./useCameraPermission";

export default function Squat() {
  const [reps, setReps] = useState(0);

  const model = useModel();

  const cameraPermission = useCameraPermission();
  const webcamEnabled = cameraPermission === "granted";
  const { webcamRef, webcam } = useWebcam(webcamEnabled);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    submittedReps: number
  ) {
    event.preventDefault();
    setReps(submittedReps);
  }

  const GetAccess = () => {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
    return null;
  };

  return (
    <>
      <video autoPlay playsInline muted ref={webcamRef} />

      {reps === 0 && <Form handleSubmit={handleSubmit} />}

      {reps > 0 && cameraPermission !== "granted" && (
        <>
          <h1 className="text-3xl font-bold underline">
            Please allow camera access...
          </h1>
          <GetAccess />
        </>
      )}

      {reps > 0 && cameraPermission === "granted" && <h1>Access granted!</h1>}
    </>
  );
}
