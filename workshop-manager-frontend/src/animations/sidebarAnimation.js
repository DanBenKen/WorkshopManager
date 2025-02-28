export const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };
  
  export const overlayVariants = {
    visible: { opacity: 0.5 },
    hidden: { opacity: 0 },
  };
  
  export const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 },
  };