"use client";

import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line, Circle } from "rc-progress";

interface WebcamProps {
  onStepChange: () => void;
  webcam: any;
  model: poseDetection.PoseDetector | undefined;
}

const Hold = ({ onStepChange, webcam, model }: WebcamProps) => {
  const [holdCount, setHoldCount] = useState(0);

  useEffect(() => {
    if (!model || !webcam) return;

    const intervalId = setInterval(async () => {
      const img = await webcam.capture();
      const poses = await model.estimatePoses(img);
      img.dispose();
      console.log(poses.length && poses[0].score);
      if (poses.length && poses[0].score! > 0.4) {
        setHoldCount((prevHoldCount) => prevHoldCount + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [model, webcam]);

  useEffect(() => {
    if (holdCount === 5) {
      onStepChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdCount]);

  return (
    <>
      <div className="absolute rounded-xl bg-black bg-opacity-30 shadow-md flex flex-row items-center justify-center top-0 right-0 m-2 w-36 p-2">
        <span className="absolute text-7xl text-white font-bold">
          {holdCount}
        </span>
        <Circle
          percent={holdCount * 20}
          strokeWidth={6}
          trailWidth={6}
          strokeLinecap="round"
          strokeColor="#22c55e"
          trailColor="#dcfce7"
        />
      </div>
    </>
  );
};

export default Hold;
