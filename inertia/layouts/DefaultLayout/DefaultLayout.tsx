import { useState, useEffect, useMemo } from 'react';

import HeaderLayout from '~/components/headers/MainHeader';
import BackgroundLayout from '../BackgroundLayout/BackgroundLayout';

function DefaultLayout( children: React.ReactNode ) {

  const initialTheme = useMemo(() => localStorage.getItem('theme') || 'emerald', []);
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='flex flex-col min-h-screen'>
      <BackgroundLayout theme={theme} />
      <HeaderLayout theme={theme} setTheme={setTheme} />
      <main className='flex flex-1'>
        {children}
      </main>
    </div>
  );
}

export default DefaultLayout;