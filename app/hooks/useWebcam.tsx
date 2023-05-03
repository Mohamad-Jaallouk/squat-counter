import { useState, useEffect, RefObject } from "react";
import * as tf from "@tensorflow/tfjs";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

export default function useWebcam(
  webcamRef: RefObject<HTMLVideoElement>,
  cameraPermission: string | null
): WebcamIterator | null {
  const [webcam, setWebcam] = useState<WebcamIterator | null>(null);

  useEffect(() => {
    const initWebcam = async () => {
      if (!webcamRef.current) return;
      if (cameraPermission === "granted") {
        try {
          const initializedWebcam = await tf.data.webcam(webcamRef.current);
          setWebcam(initializedWebcam);
        } catch (error) {
          console.error("Error initializing webcam:", error);
        }
      }
    };
    initWebcam();
  }, [cameraPermission, webcamRef]);

  return webcam;
}
