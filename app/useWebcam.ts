import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator";

const useWebcam = () => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [webcam, setWebcam] = useState<WebcamIterator | undefined>();

  useEffect(() => {
    console.log("Initializing webcam...");
    const initializeWebcam = async () => {
      if (!webcamRef.current) return;

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
  }, []);

  return {
    webcamRef,
    webcam,
  };
};

export default useWebcam;
