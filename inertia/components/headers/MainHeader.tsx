import { Link, usePage } from '@inertiajs/react';
import ThemeController from '../themeController/ThemeController';
import ThemeControllerMobile from '../themeController/ThemeControllerMobile';
import type { User } from '#types/User';

interface HeaderLayoutProps {
  theme: string;
  setTheme: (theme: string) => void;
}

function HeaderLayout({ theme, setTheme }: HeaderLayoutProps) {
  const { user } = usePage<{ user: User }>().props;

  return (
    <header>
      <div className="navbar">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">Adonis JS</Link>
        </div>
        <div className="flex-none gap-2 hidden lg:flex">
        { user && <p>Welcome {user.firstName} {user.lastName}</p> }
          <ul className="menu menu-horizontal px-1 gap-2">
              { user ?
              (
                <li>
                  <Link className='btn btn-ghost' href="/logout">Logout</Link>  
                </li>
              ) :
                (<>
                  <li>
                    <Link className='btn btn-ghost' href="/login">Login</Link>
                  </li>
                  <li>
                    <Link className='btn btn-ghost' href='/register'>Register</Link>
                  </li>
                </>)
              }
          </ul>
          <ThemeController theme={theme} setTheme={setTheme} />
        </div>
        <div className="dropdown dropdown-end block lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Register</Link></li>
            <li>
              <ThemeControllerMobile theme={theme} setTheme={setTheme} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default HeaderLayout;