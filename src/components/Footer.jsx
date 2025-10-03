import React from 'react';
import { trackXLinkClick } from '../utils/analytics';

const Footer = () => {
  return (
    <footer className="bg-[#E4EAF2] border-t border-black/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto text-center">

          {/* 底部信息 */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* 版權信息 */}
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} PinTool. All rights reserved.
            </p>

            {/* X 社交連結 */}
            <a
              href="https://x.com/PinToolX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              onClick={trackXLinkClick}
            >
              <span className="sr-only">Follow us on X (Twitter)</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;