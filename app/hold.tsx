"use client";

import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import React from "react";

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
      <div className="absolute bottom-0 left-0 right-0 mx-2 mb-14 lg:my-2  rounded-xl border border-gray-200 bg-white shadow-md">
        <h1 className="text-7xl relative text-red-600 text-center">
          {holdCount}
        </h1>
      </div>
    </>
  );
};

export default Hold;
