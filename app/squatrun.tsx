"use client";

import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { calculateAngle, convertToDegrees, landMark } from "./appl";
import { Line, Circle } from "rc-progress";

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
  // squatCount: number;
  // setSquatCount: React.Dispatch<React.SetStateAction<number>>;
  onStepChange: () => void;
  webcam: any;
  model: poseDetection.PoseDetector | undefined;
  nReps: number;
}

function SquatRun({ onStepChange, webcam, model, nReps }: WebcamProps) {
  const [squatCount, setSquatCount] = useState(0);
  const prev = useRef("standing");
  console.log("nReps", nReps);
  console.log("squatCount", squatCount);

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

  useEffect(() => {
    if (squatCount === nReps) {
      onStepChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squatCount]);

  return (
    <>
      <div className="absolute rounded-xl bg-black bg-opacity-30 shadow-md flex flex-row items-end top-0 right-0 m-2 w-36 p-2">
        {/* <h1 className="text-7xl relative text-red-600">{holdCount}</h1> */}
        <span className="absolute flex items-center justify-center">
          TEXT squat
        </span>
        <Circle
          percent={squatCount * 20}
          strokeWidth={8}
          strokeColor="#22c55e"
          trailWidth={4}
          trailColor="#dcfce7"
        />
      </div>
    </>
  );
}

export default SquatRun;
