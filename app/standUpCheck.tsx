import { useEffect, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { motion } from "framer-motion";
import CardBottomCenter from "./components/cardBottomCenter";
import CardTopRight from "./components/cardTopRight";
import OkCheck from "./icons/okCheck";
import Circle from "./components/circle";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

interface StandUpCheckProps {
  onStepChange: () => void;
  webcam: WebcamIterator | null;
  model: poseDetection.PoseDetector | null;
}

export default function StandUpCheck({
  onStepChange,
  webcam,
  model,
}: StandUpCheckProps) {
  const [holdCount, setHoldCount] = useState(0);

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
      setTimeout(() => {
        onStepChange();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holdCount]);

  return (
    <>
      <CardTopRight
        progressBar={<Circle percent={holdCount * 20} />}
        progressAction={holdCount < 5 ? holdCount : <OkCheck />}
      />

      <motion.div
        initial="visible"
        animate={holdCount === 5 ? "hidden" : "visible"}
        variants={instructionVariants}
      >
        <CardBottomCenter discritpion="Stand in front of the camera" />
      </motion.div>
    </>
  );
}

const instructionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
