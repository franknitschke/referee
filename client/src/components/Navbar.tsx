import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

type NavbarProps = {
  location: Record<'pathname', string>;
  settings: SettingsObject
}

function Navbar({ location, settings }: NavbarProps) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = location?.pathname.replace('/', '') || 'home';
  }, [location]);

  return (
    <div
      className={`${
        location?.pathname === '/display' ||
        location?.pathname === '/countdown' ||
        location?.pathname === '/versuch' ||
        (location?.pathname === '/ref' && !settings?.refMenu)
          ? 'hidden'
          : ''
      } navbar bg-base-100 z-50`}
    >
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost btn-circle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50'
          >
            <li>
              <Link to={'/'}>Home</Link>
            </li>

            <li>
              <Link to={'/display'}>Display</Link>
            </li>

            <li>
              <Link to={'/countdown'}>Countdown</Link>
            </li>

            <li>
              <Link to={'/versuch'}>Versuch</Link>
            </li>

            <li>
              <Link to={'/settings'}>Settings</Link>
            </li>

            {/* <li>
              <Link to={'/dashboard'}>Dashboard</Link>
            </li> */}

            <li>
              <Link to={'/ref'}>Wertung</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-end'>
        <div className='font-semibold'>
          {location?.pathname.replace('/', '')}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
