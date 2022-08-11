import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import classes from './toggleTheme.module.css';
const ToggleTheme = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState<any | null>(null);

  useEffect(() => {
    resolvedTheme === 'light' ? setIsDark(false) : setIsDark(true);
  }, [resolvedTheme]);
  const imgSrc = isDark ? '/themes/light.svg' : '/themes/dark.svg';
  const toggleThemeClick = () => {
    isDark ? setTheme('light') : setTheme('dark');
  };
  return (
    <button className="w-4" onClick={toggleThemeClick}>
      <img src={imgSrc} alt="Toggle theme" className={classes.image} />
    </button>
  );
};

export default ToggleTheme;
