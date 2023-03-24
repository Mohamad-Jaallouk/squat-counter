"use client";

import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import React from "react";
import { PoseDetector } from "@tensorflow-models/pose-detection";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

interface WebcamProps {
  onStepChange: () => void;
  webcam: any;
  model: poseDetection.PoseDetector | undefined;
}

const Hold = ({ onStepChange, webcam, model }: WebcamProps) => {
  const [holdCount, setHoldCount] = useState(0);

  // const [modelInstance, setModelInstance] =
  //   useState<poseDetection.PoseDetector>();

  // const [webcamInstance, setWebcamInstance] = useState<WebcamIterator>();

  // useEffect(() => {
  //   const loadModel = async () => {
  //     const loadedModel = await model;
  //     setModelInstance(loadedModel);
  //   };
  //   loadModel();
  // }, [model]);

  // useEffect(() => {
  //   const loadWebcam = async () => {
  //     const lodadedWebcam = await webcam;
  //     setWebcamInstance(lodadedWebcam);
  //   };
  //   loadWebcam();
  // }, [webcam]);

  useEffect(() => {
    if (!model || !webcam) return;

    const intervalId = setInterval(async () => {
      const img = await webcam.capture();
      const poses = await model.estimatePoses(img);
      img.dispose();
      console.log(poses.length && poses[0].score);
      if (poses.length && poses[0].score! > 0.4) {
        // console.log(poses[0].score);
        setHoldCount((prevHoldCount) => prevHoldCount + 1);
      }

      // if (8000 > 2000) {
      //   setHoldCount((prevHoldCount) => prevHoldCount + 1);
      // }
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
      <h1 className="text-7xl relative text-red-600">{holdCount}</h1>
    </>
  );
};

export default Hold;
