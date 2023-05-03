import { motion } from "framer-motion";

const successAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

export default function OkCheck({ className }: { className?: string }) {
  return (
    <motion.svg
      initial="hidden"
      animate="visible"
      variants={successAnimation}
      className={className}
      width="64"
      height="64"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM10 18L5 13L6.414 11.586L10 15.172L17.586 7.586L19 9L10 18Z"
        fill="white"
      />
    </motion.svg>
  );
}
