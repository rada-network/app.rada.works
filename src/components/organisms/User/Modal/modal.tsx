import React, { Fragment } from 'react';
import { signIn } from 'next-auth/react';

const Modal = (props: { connect: any }) => {
  const { connect } = props;
  const [showModal, setShowModal] = React.useState(false);
  const metamarkLogin = () => {
    connect();
  };
  const googleSigner = async () => {
    await signIn('google');
  };
  const gitSigner = async () => {
    await signIn('github');
  };
  const facebookSigner = async () => {
    await signIn('facebook');
  };
  return (
    <Fragment>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        data-modal-toggle="crypto-modal"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      >
        Login
      </button>
      {showModal && (
        <div
          id="crypto-modal"
          tabIndex={-1}
          className="bg-gray-900 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="crypto-modal"
              >
                <span className="sr-only">Close modal</span>
              </button>
              <div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
                <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white my-0">
                  Authentication
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400 m-0">
                  Connect with one of our available wallet providers or create a
                  new one.
                </p>
                <ul className="my-4 space-y-3 list-none m-0 p-0">
                  <li>
                    <a
                      onClick={() => googleSigner()}
                      href="#"
                      className="bg-gray-50 dark:bg-gray-600 border border-gray-300 hover:bg-white hover:border-violet-600 shadow hover:shadow-md flex items-center p-3 text-base font-bold text-gray-900 rounded-lg hover:bg-gray-100 group dark:hover:bg-gray-500 dark:text-white"
                    >
                      <span className="w-6">
                        <img
                          src="https://d11gciwieyoy00.cloudfront.net/images/icons/google.svg"
                          alt="Google"
                        />
                      </span>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Sign-in with Google
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => facebookSigner()}
                      href="#"
                      className="bg-gray-50 dark:bg-gray-600 border border-gray-300 hover:bg-white hover:border-violet-600 shadow hover:shadow-md flex items-center p-3 text-base font-bold text-gray-900 rounded-lg hover:bg-gray-100 group dark:hover:bg-gray-500 dark:text-white"
                    >
                      <span className="w-6">
                        <img
                          src="https://d11gciwieyoy00.cloudfront.net/images/icons/google.svg"
                          alt="Google"
                        />
                      </span>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Sign-in with Facebook
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => gitSigner()}
                      href="#"
                      className="bg-gray-50 dark:bg-gray-600 border border-gray-300 hover:bg-white hover:border-violet-600 shadow hover:shadow-md flex items-center p-3 text-base font-bold text-gray-900 rounded-lg hover:bg-gray-100 group dark:hover:bg-gray-500 dark:text-white"
                    >
                      <span className="w-6">
                        <img
                          src="https://d11gciwieyoy00.cloudfront.net/images/icons/google.svg"
                          alt="Google"
                        />
                      </span>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Sign-in with Github
                      </span>
                    </a>
                  </li>
                  <li className="text-center my-0 py-0">Or</li>
                  <li>
                    <a
                      onClick={metamarkLogin}
                      href="#"
                      className="bg-gray-50 dark:bg-gray-600 border border-gray-300 hover:border-violet-600 shadow flex items-center p-3 text-base font-bold text-gray-900 rounded-lg hover:bg-gray-100 group hover:shadow-md dark:hover:bg-gray-500 dark:text-white"
                    >
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        WalletConnect
                      </span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                        Popular
                      </span>
                    </a>
                  </li>
                </ul>
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Why do I need to connect with my wallet?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Modal;
