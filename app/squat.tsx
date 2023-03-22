"use client";

import "@tensorflow/tfjs-backend-cpu";
import Form from "./form";
import { useState } from "react";
import useModel from "./useModel";
import useWebcam from "./useWebcam";
import useCameraPermission from "./useCameraPermission";
import Webcam from "react-webcam";

export default function Squat() {
  const [reps, setReps] = useState(0);

  const cameraPermission = useCameraPermission();
  const webcamEnabled = cameraPermission === "granted";
  const { webcamRef, webcam } = useWebcam(webcamEnabled);

  const model = useModel();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    submittedReps: number
  ) {
    event.preventDefault();
    setReps(submittedReps);
  }

  return (
    <>
      <video autoPlay playsInline muted ref={webcamRef} />

      {reps === 0 && <Form handleSubmit={handleSubmit} />}

      {reps > 0 && cameraPermission !== "granted" && (
        <>
          <h1 className="text-3xl font-bold underline">
            Please allow camera access...
          </h1>
          <Webcam height={0} width={0} />
        </>
      )}

      {reps > 0 && cameraPermission === "granted" && (
        <h1>Camera access granted</h1>
      )}
    </>
  );
}
