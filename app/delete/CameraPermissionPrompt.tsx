import React from "react";

interface CameraPermissionPromptProps {
  onPermissionGranted: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CameraPermissionPrompt: React.FC<CameraPermissionPromptProps> = ({
  onPermissionGranted,
}) => (
  <>
    <h5 className="">
      To count your squats accurately and provide real-time feedback, we need
      access to your camera. Would you like to grant access?
    </h5>
    <button className="fixed" onClick={onPermissionGranted}>
      Yes
    </button>
  </>
);

export default CameraPermissionPrompt;
