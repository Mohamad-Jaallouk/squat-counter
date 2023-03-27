import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { calculateAngle, convertToDegrees, landMark } from "./appl";
import CardTopRight from "./components/cardTopRight";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";
import Circle from "./components/circle";

function _squat(landMarks: any, prev: any, setSquatCount: any, setAngle: any) {
  let kneeAngleRadians = calculateAngle(
    landMarks[landMark.RightHip],
    landMarks[landMark.RightKnee],
    landMarks[landMark.RightAnkle]
  );
  let kneeAngleDegree = convertToDegrees(kneeAngleRadians);
  setAngle(kneeAngleDegree);

  if (kneeAngleDegree < 90 && prev.current === "standing") {
    setSquatCount((c: number) => c + 1);
    prev.current = "squatting";
  } else if (kneeAngleDegree > 90 && prev.current === "squatting") {
    prev.current = "standing";
  }
}

interface SquatRunProps {
  onStepChange: () => void;
  webcam: WebcamIterator | null;
  model: poseDetection.PoseDetector | null;
  nReps: number;
}

export default function SquatRun({
  onStepChange,
  webcam,
  model,
  nReps,
}: SquatRunProps) {
  const [squatCount, setSquatCount] = useState(0);
  const prev = useRef("standing");
  const score = useRef(0);
  console.log("nReps", nReps);
  console.log("squatCount", squatCount);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const runSquat = async () => {
      if (!webcam || !model) return;
      const img = await webcam.capture();
      const poses = await model.estimatePoses(img);
      img.dispose();
      if (poses.length > 0 && poses[0].score! > 0.5) {
        score.current = poses[0].score!;
        const landMarks = poses[0].keypoints;
        _squat(landMarks, prev, setSquatCount, setAngle);
      }

      requestAnimationFrame(runSquat);
    };

    requestAnimationFrame(runSquat);
  }, [webcam, model, setSquatCount]);

  useEffect(() => {
    if (squatCount === nReps) {
      onStepChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squatCount]);

  return (
    <>
      <CardTopRight
        progressBar={<Circle percent={angle} gap={true} />}
        progressAction={angle.toFixed(0)}
      />
    </>
  );
}
