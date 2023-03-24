import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-cpu";

async function loadModel() {
  const modelConfig = poseDetection.SupportedModels.MoveNet;
  const detector = await poseDetection.createDetector(modelConfig);

  // Warmup the model
  const dummyImg = tf.randomNormal([224, 224, 3]) as tf.Tensor3D;
  await detector.estimatePoses(dummyImg);
  tf.dispose(dummyImg);

  return detector;
}

export default loadModel;
