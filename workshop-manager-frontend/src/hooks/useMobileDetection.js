import { useState, useEffect } from 'react';

const useMobileDetection = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
      setSidebarOpen(window.innerWidth >= breakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return { isMobile, sidebarOpen, setSidebarOpen };
};

export default useMobileDetection;