import React from 'react';
// Independent Project-Job Niche
const Footer = () => {
  const quickLinks = [
    {
      name: 'Contact',
      href: '/contact-us',
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {/* Telephone icon */}
          <path d="M3 5.25a2 2 0 012-2h2.25a.75.75 0 01.75.75v3a.75.75 0 01-.75.75H6.5a11.95 11.95 0 005.48 5.48v-1.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V19a2 2 0 01-2 2h-1A16 16 0 013 5.25z" />
        </svg>
      ),
    },
    {
      name: 'Templates',
      href: '/templates',
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
        </svg>
      ),
    },
    {
      name: 'Profile',
      href: '/user-profile',
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-6 2.67-6 6h12c0-3.33-2.67-6-6-6z" />
        </svg>
      ),
    },
    {
      name: 'About',
      href: '/about-us',
      icon: (
        <svg
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      ),
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12a10 10 0 10-11.625 9.875v-6.987H8.078v-2.888h2.297v-2.203c0-2.27 1.357-3.528 3.437-3.528.996 0 2.037.178 2.037.178v2.25h-1.153c-1.136 0-1.488.705-1.488 1.43v1.873h2.53l-.404 2.888h-2.126v6.987A10 10 0 0022 12z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23 3a10.9 10.9 0 01-3.14.86 5.48 5.48 0 002.4-3.02 11.07 11.07 0 01-3.5 1.34A5.52 5.52 0 0016.5 2a5.49 5.49 0 00-5.5 5.5c0 .43.05.85.14 1.25A15.64 15.64 0 013 4.67a5.51 5.51 0 001.7 7.34 5.47 5.47 0 01-2.5-.7v.07a5.5 5.5 0 004.4 5.4 5.52 5.52 0 01-2.48.1 5.5 5.5 0 005.1 3.82 11 11 0 01-6.8 2.35c-.44 0-.87-.02-1.3-.08A15.5 15.5 0 008.2 21c10.1 0 15.62-8.36 15.62-15.6 0-.24 0-.48-.02-.71A11.14 11.14 0 0023 3z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 1.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 3a2 2 0 110 4 2 2 0 010-4zM2 8h4v12H2zM8 8h3.6v1.7h.05c.5-.95 1.7-1.95 3.5-1.95 3.75 0 4.45 2.5 4.45 5.75V20H15v-5.25c0-1.25-.02-2.87-1.75-2.87-1.75 0-2 1.3-2 2.78V20H8z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-slate-900 text-gray-200 py-2 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Logo & About */}
        <div className="flex flex-col max-w-sm">
  <h2 className="text-3xl font-extrabold tracking-widest text-white mb-2">
    RESUME BUILDER
  </h2>
  <p className="text-gray-300 leading-relaxed">
    Your ultimate resume builder platform. Create professional, eye-catching resumes quickly and easily.
  </p>
  <p className="text-sm text-gray-400">&copy; 2025 Resume Builder. All rights reserved.</p>
</div>


        {/* Navigation Links with icons */}
        <nav className="flex flex-col items-center">
          <h3 className="uppercase text-white tracking-wider font-semibold mb-3 text-center w-full max-w-xs">
            Quick Links
          </h3>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-6 max-w-xs w-full">
            {quickLinks.map(({ name, href, icon }) => (
              <li key={name}>
                <a
                  href={href}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <span>{icon}</span>
                  <span>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons Grid with 2 per row */}
        <div className="flex flex-col items-center">
          <h3 className="uppercase text-white tracking-wider font-semibold mb-3 text-center w-full max-w-xs">
            Follow Us
          </h3>
          <ul className="grid grid-cols-2 gap-y-4 gap-x-6 max-w-xs w-full">
            {socialLinks.map(({ name, href, icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={name}
                >
                  {icon}
                  <span className="font-medium">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;