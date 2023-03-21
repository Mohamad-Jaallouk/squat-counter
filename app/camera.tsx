import React, { useEffect, useRef } from "react";

const CameraComponent = ({ videoRef }) => {
  // useEffect(() => {
  //   const requestCameraAccess = async () => {
  //     try {
  //       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //         const stream = await navigator.mediaDevices.getUserMedia({
  //           video: true,
  //         });

  //         if (videoRef.current) {
  //           videoRef.current.srcObject = stream;
  //         }
  //       } else {
  //         console.error("Camera access not supported by this browser.");
  //       }
  //     } catch (error) {
  //       console.error("Error accessing camera:", error);
  //     }
  //   };

  //   requestCameraAccess();
  // }, []);

  return <video ref={videoRef} autoPlay playsInline />;
};

export default CameraComponent;
