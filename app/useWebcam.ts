import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

const useWebcam = (webcamEnabled: boolean) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const [webcam, setWebcam] = useState<WebcamIterator | undefined>();

  useEffect(() => {
    const initializeWebcam = async () => {
      if (!webcamRef.current) return;

      if (!webcamEnabled) return;

      try {
        webcamRef.current.width = 1280;
        webcamRef.current.height = 720;
        const initializedWebcam = await tf.data.webcam(webcamRef.current);
        setWebcam(initializedWebcam);
      } catch (error) {
        console.error("Error initializing webcam:", error);
      }
    };

    initializeWebcam();

    return () => {
      webcam?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef, webcamEnabled]);

  return {
    webcamRef,
    webcam,
  };
};

export default useWebcam;
