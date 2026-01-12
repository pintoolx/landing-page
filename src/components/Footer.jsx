import React from 'react';
import { trackXLinkClick, trackTelegramLinkClick } from '../utils/analytics';

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

            {/* 社交連結 */}
            <div className="flex items-center gap-4">
              {/* X (Twitter) */}
              <a
                href="https://x.com/PinToolX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                onClick={trackXLinkClick}
              >
                <span className="sr-only">Follow us on X (Twitter)</span>
                <svg
                  className="icon-x w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/pintoolfam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300"
                onClick={trackTelegramLinkClick}
              >
                <span className="sr-only">Join us on Telegram</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.707 11.558c5.626-2.452 9.377-4.07 11.253-4.852 5.361-2.234 6.476-2.62 7.204-2.633.16-.003.517.037.748.225.195.159.249.373.275.524.026.15.059.494.033.762-.293 3.068-1.555 10.513-2.197 13.951-.271 1.454-.806 1.941-1.323 1.988-1.124.104-1.977-.743-3.067-1.457-1.705-1.118-2.668-1.815-4.323-2.906-1.914-1.261-.674-1.954.418-3.087.285-.296 5.244-4.81 5.341-5.217.012-.051.023-.242-.09-.342-.114-.101-.281-.066-.402-.039-.171.039-2.895 1.841-8.172 5.405-.774.533-1.475.792-2.104.779-.692-.013-2.023-.391-3.013-.712-1.214-.395-2.179-.604-2.095-1.275.044-.349.525-.706 1.442-1.072z" />
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;