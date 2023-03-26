import React, { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line, Circle } from "rc-progress";
import { motion } from "framer-motion";

interface WebcamProps {
  onStepChange: () => void;
  webcam: any;
  model: poseDetection.PoseDetector | undefined;
}

const Hold = ({ onStepChange, webcam, model }: WebcamProps) => {
  const [holdCount, setHoldCount] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!model || !webcam) return;
    if (holdCount === 5) return;

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
  }, [holdCount, model, webcam]);

  useEffect(() => {
    if (holdCount === 5) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onStepChange();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdCount]);

  const successAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  const instructionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
      <div className="absolute rounded-xl bg-black bg-opacity-30 shadow-md flex flex-row items-center justify-center top-0 right-0 m-2 w-36 p-2">
        {holdCount < 5 ? (
          <span className="absolute text-7xl text-white font-bold">
            {holdCount}
          </span>
        ) : (
          <motion.svg
            initial="hidden"
            animate="visible"
            variants={successAnimation}
            className="absolute"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM10 18L5 13L6.414 11.586L10 15.172L17.586 7.586L19 9L10 18Z"
              fill="white"
            />
          </motion.svg>
        )}
        <Circle
          percent={holdCount * 20}
          strokeWidth={6}
          trailWidth={6}
          strokeLinecap="round"
          strokeColor="#22c55e"
          trailColor="#dcfce7"
        />
      </div>

      <motion.div
        initial="visible"
        animate={holdCount === 5 ? "hidden" : "visible"}
        variants={instructionVariants}
        className="absolute rounded-xl bg-white bg-opacity-30 shadow-md flex flex-row items-center justify-center bottom-0 left-0 right-0 m-2 p-2 my-16 lg:my-2"
      >
        <span className="text-xl text-white font-bold">
          Stand in front of the camera
        </span>
      </motion.div>
    </>
  );
};

export default Hold;
