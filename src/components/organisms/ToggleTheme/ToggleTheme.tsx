import { useEffect, useState } from 'react';

const ToggleTheme = () => {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'dark'
  );

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
  console.log(colorTheme);
  return (
    <div className="toggle-theme">
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
};

export default ToggleTheme;
