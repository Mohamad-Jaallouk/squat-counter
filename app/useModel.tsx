import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { useEffect, useState } from "react";
async function useModel() {
  const [model, setModel] = useState<poseDetection.PoseDetector>();

  useEffect(() => {
    console.log("Use model effect");
    async function load() {
      const modelConfig = poseDetection.SupportedModels.MoveNet;
      const detector = await poseDetection.createDetector(modelConfig);
      setModel(detector);

      // Warmup the model
      const dummyImg = tf.randomNormal([224, 224, 3]) as tf.Tensor3D;
      await detector.estimatePoses(dummyImg);
      tf.dispose(dummyImg);

      return () => {
        detector.dispose();
      };
    }
    load();
  }, [setModel]);

  return model;
}

export default useModel;