import { Variants } from 'framer-motion';


export interface AnimationVariants extends Variants {
  hidden: {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
  };
  visible: {
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
  };
}

export const animateInView = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export const inLeftMoving: AnimationVariants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const inRightMovingNoOp: AnimationVariants = {
    hidden: {
      x: 100,
    },
    visible: {
      x: 0,
    },
};

export const inDownMoving: AnimationVariants = {
  hidden: {
    y: 60,
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

export const miniInDownMoving: AnimationVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

export const pulseAnimation = {
  scale: [1, 1.1, 1.2, 1.4, 1.6, 1.8, 2, 2.6, 1],
  opacity: [1, 1, 0.8, 0.6, 0.5, 0.4, 0.2, 0.1, 0.05, 0],
};

export const fadeAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1 
    },
  },
  exit: {
    opacity: 0,
  },
};


