import { Circle as Circle2 } from "rc-progress";

export default function Circle({
  percent = 0,
  strokeWidth = 6,
  trailWidth = 6,
  strokeLinecap = "round",
  strokeColor = "#22c55e",
  trailColor = "#dcfce7",
  gap = false,
}: {
  percent: number;
  strokeWidth?: number;
  trailWidth?: number;
  strokeLinecap?: string;
  strokeColor?: string;
  trailColor?: string;
  gap?: boolean;
}) {
  return (
    <Circle2
      percent={percent}
      strokeWidth={6}
      trailWidth={6}
      strokeLinecap="round"
      strokeColor="#22c55e"
      trailColor="#dcfce7"
      gapDegree={gap ? 70 : 0}
      gapPosition="bottom"
    />
  );
}
