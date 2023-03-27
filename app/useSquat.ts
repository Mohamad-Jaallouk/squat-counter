import { useSquatContext } from "./SquatContext";

export default function useSquat(cameraPermission: any) {
  const { step, handleStep } = useSquatContext();

  if (step === 0 && cameraPermission === "granted") {
    handleStep();
  }

  return { step, handleStep };
}
