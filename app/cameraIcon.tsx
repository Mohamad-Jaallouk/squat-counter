export default function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      stroke="url(#ffflux-gradient)"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
      <circle cx="12" cy="13" r="3"></circle>
      <defs>
        <linearGradient
          gradientTransform="rotate(150, 0.5, 0.5)"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="ffflux-gradient"
        >
          <stop
            stopColor="rgb(107, 114, 128, 0.2)"
            stopOpacity="1"
            offset="0%"
          ></stop>
          <stop
            stopColor="rgb(107, 114, 128, 0.2)"
            stopOpacity="1"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
