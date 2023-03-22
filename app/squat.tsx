"use client";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import Form from "./form";
import { useState, useRef, useEffect } from "react";
import useModel from "./useModel";
import useWebcam from "./useWebcam";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";
import * as poseDetection from "@tensorflow-models/pose-detection";
import useCameraPermission from "./useCameraPermission";

export default function Squat() {
  const [reps, setReps] = useState(0);
  const webcamRef2 = useRef<HTMLVideoElement>(null);

  const { webcamRef, webcam } = useWebcam();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    submittedReps: number
  ) {
    event.preventDefault();
    setReps(submittedReps);
  }

  console.log("Run something in between");

  const model = useModel();
  const cameraPermission = useCameraPermission();
  console.log("Run last");
  console.log(webcamRef2.current);

  return (
    <>
      <video autoPlay playsInline muted ref={webcamRef2} />

      {/* <CameraComponent videoRef={webcamRef} />
      <p>Status: {cameraPermission}</p>
      {reps === 0 ? (
        <Form handleSubmit={handleSubmit} />
      ) : cameraPermission === "granted" ? (
        <video autoPlay playsInline muted ref={webcamRef} />
      ) : (
        <>
          <h1 className="text-3xl font-bold underline">
            Please allow camera access
          </h1>
        </>
      )} */}
    </>
  );
}
