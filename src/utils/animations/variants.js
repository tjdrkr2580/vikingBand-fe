import { Variant } from "framer-motion";

export const modalVariants = {
  start: {
    opacity: 0,
    y: 30,
  },
  animated: {
    opacity: 1,
    y: 0,
    transition: {
      duraition: 0.25,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
  },
};
