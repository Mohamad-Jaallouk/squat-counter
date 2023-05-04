import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { calculateAngle, convertToDegrees, landMark } from "./appl";
import CardTopRight from "./components/cardTopRight";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";
import Circle from "./components/circle";

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
  const prev = useRef("standing");
  const [squatCount, setSquatCount] = useState(0);
  const [angle, setAngle] = useState(180);
  const [stableAngle, setStableAngle] = useState(180);

  useEffect(() => {
    const runSquat = async () => {
      if (!webcam || !model) return;
      const img = await webcam.capture();
      const poses = await model.estimatePoses(img);
      img.dispose();

      if (poses.length > 0 && poses[0].score! > 0.7) {
        const landMarks: poseDetection.Keypoint[] = poses[0].keypoints!;

        if (
          landMarks[landMark.RightShoulder].score! > 0.6 ||
          landMarks[landMark.RightHip].score! > 0.6 ||
          landMarks[landMark.RightKnee].score! > 0.6 ||
          landMarks[landMark.RightAnkle].score! > 0.6
        ) {
          const hipAngleRadians = calculateAngle(
            landMarks[landMark.RightShoulder],
            landMarks[landMark.RightHip],
            landMarks[landMark.RightKnee]
          );
          const hipAngleDegree = convertToDegrees(hipAngleRadians);

          const kneeAngleRadians = calculateAngle(
            landMarks[landMark.RightHip],
            landMarks[landMark.RightKnee],
            landMarks[landMark.RightAnkle]
          );
          const kneeAngleDegree = convertToDegrees(kneeAngleRadians);

          setAngle(kneeAngleDegree);

          if (
            kneeAngleDegree < 90 &&
            prev.current === "standing" &&
            hipAngleDegree < 90
          ) {
            setSquatCount((prev) => prev + 1);
            prev.current = "squatting";
          } else if (
            kneeAngleDegree > 90 &&
            prev.current === "squatting" &&
            hipAngleDegree > 90
          ) {
            prev.current = "standing";
          }
        }
      }

      requestAnimationFrame(runSquat);
    };

    requestAnimationFrame(runSquat);
  }, [webcam, model]);

  // Work as a stabilizer for the angle
  useEffect(() => {
    if (stableAngle - angle > 0 || stableAngle - angle < -5) {
      setStableAngle(angle);
    }
  }, [angle, stableAngle]);

  useEffect(() => {
    if (squatCount === nReps) {
      onStepChange();
    }
  }, [nReps, onStepChange, squatCount]);

  const angleView = Math.max(0, 160 - stableAngle); // 180 - 20 = 160 ==> -20 is a threshold

  return (
    <>
      <CardTopRight
        progressBar={<Circle percent={Math.min(100, angleView)} gap={true} />}
        progressAction={squatCount.toFixed(0)}
      />
    </>
  );
}
