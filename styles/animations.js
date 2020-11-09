export const easing = [0.6, -0.05, 0.01, 0.99];

export const fadeIn = {
  initial: {
    opacity: 0,
    y: 60,
    transition: { duration: 0.6, ease: easing },
  },
  animate: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: easing,
    },
  }),
};

export const hidden = { opacity: 0 };
