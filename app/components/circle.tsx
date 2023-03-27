import { Circle as Circle2 } from "rc-progress";

export default function Circle({
  percent = 0,
  strokeWidth = 6,
  trailWidth = 6,
  strokeLinecap = "round",
  strokeColor = "#22c55e",
  trailColor = "#dcfce7",
}: {
  percent: number;
  strokeWidth?: number;
  trailWidth?: number;
  strokeLinecap?: string;
  strokeColor?: string;
  trailColor?: string;
}) {
  return (
    <Circle2
      percent={percent}
      strokeWidth={6}
      trailWidth={6}
      strokeLinecap="round"
      strokeColor="#22c55e"
      trailColor="#dcfce7"
    />
  );
}
