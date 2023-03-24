"use client";

import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { calculateAngle, convertToDegrees, landMark } from "./appl";
import React, { RefObject } from "react";
import { PoseDetector } from "@tensorflow-models/pose-detection";
// import { Box, Card, CardContent, Typography } from "@mui/material";

function _squat(landMarks: any, prev: any, setSquatCount: any) {
  let kneeAngleRadians = calculateAngle(
    landMarks[landMark.RightHip],
    landMarks[landMark.RightKnee],
    landMarks[landMark.RightAnkle]
  );
  let kneeAngleDegree = convertToDegrees(kneeAngleRadians);
  if (kneeAngleDegree < 90 && prev.current === "standing") {
    setSquatCount((c: number) => c + 1);
    prev.current = "squatting";
  } else if (kneeAngleDegree > 90 && prev.current === "squatting") {
    prev.current = "standing";
  }
}

interface WebcamProps {
  squatCount: number;
  setSquatCount: React.Dispatch<React.SetStateAction<number>>;
  webcam: any;
  model: poseDetection.PoseDetector | undefined;
}

const SquatRun = ({
  squatCount,
  setSquatCount,
  webcam,
  model,
}: WebcamProps) => {
  // const [squatCount, setSquatCount] = useState(0);
  const prev = useRef("standing");

  // const [modelInstance, setModelInstance] =
  //   useState<poseDetection.PoseDetector>();

  // useEffect(() => {
  //   const loadModel = async () => {
  //     const loadedModel = await model;
  //     setModelInstance(loadedModel);
  //   };
  //   loadModel();
  // }, [model]);

  useEffect(() => {
    const runSquat = async () => {
      if (!webcam || !model) return;
      const img = await webcam.capture();
      const poses = await model.estimatePoses(img);
      img.dispose();
      if (poses.length > 0 && poses[0].score! > 0.5) {
        const landMarks = poses[0].keypoints;
        _squat(landMarks, prev, setSquatCount);
      }

      requestAnimationFrame(runSquat);
    };

    console.log("Before runSquat");
    console.log(webcam);
    console.log(model);
    requestAnimationFrame(runSquat);
    console.log("After runSquat");
  }, [webcam, model, setSquatCount]);

  return (
    <>
      <h1 className="text-7xl relative">{squatCount}</h1>
    </>
  );
};

export default SquatRun;
