import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import classes from './toggleTheme.module.css';
const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const colorTheme = theme === 'dark' ? 'light' : 'dark';
  const toggleTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  };
  useEffect(() => {
    const root = window.document.body;

    root.classList.remove(colorTheme);
    root.classList.add(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [colorTheme, theme]);

  return (
    <div className={classes.root}>
      <button className={classes.toggleThemeBtn} onClick={toggleTheme}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
};

export default ToggleTheme;
