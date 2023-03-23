interface KeyPoint {
  x: number;
  y: number;
  score: number;
  name: string;
}

/**
 * Convert from radians to degrees.
 */
export function convertToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Calculates the angle between 3 points in 2D space.
 */
export function calculateAngle(
  upper: KeyPoint,
  middle: KeyPoint,
  lower: KeyPoint
): number {
  const middleToLower = Math.atan2(lower.y - middle.y, lower.x - middle.x);
  const upperToMiddle = Math.atan2(upper.y - middle.y, upper.x - middle.x);

  let angle = Math.abs(middleToLower - upperToMiddle);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
}

export enum landMark {
  Nose,
  LeftEye,
  RightEye,
  LeftEar,
  RightEar,
  LeftShoulder,
  RightShoulder,
  LeftElbow,
  RightElbow,
  LeftWrist,
  RightWrist,
  LeftHip,
  RightHip,
  LeftKnee,
  RightKnee,
  LeftAnkle,
  RightAnkle,
}

