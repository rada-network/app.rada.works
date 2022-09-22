import React from 'react';

const Dashboard = (props: any) => {
  const { walletAddress } = props;

  return (
    <div className="">
      <div className="container max-w-screen-xl mx-auto py-12 px-4 lg:py-24">
        {/* Dashboard: {walletAddress} */}
        {/* Address list */}
        <div className="">
          <div className="flex items-center border border-gray-200 hover:border-blue-500 py-4 mb-2 rounded-xl hover:shadow-md transition-all duration-300">
            <div className="px-4 text-lg font-semibold">
              Off 35% all stores!
            </div>

            <div className="px-4 text-sm text-gray-600">
              <span>
                <strong>Start:</strong> Sep 14 2022
              </span>{' '}
              - <span>End: Sep 29 2022</span>
            </div>

            <div className="px-4 ml-auto">
              <a
                href="#"
                title="Edit"
                className="bg-white border border-blue-500 hover:border-blue-700 hover:bg-blue-700 text-gray-600 hover:text-white text-sm font-semibold rounded-md mr-2 py-1.5 px-4 transition-all duration-300"
              >
                Edit
              </a>

              <a
                href="#"
                title="Edit"
                className="bg-white hover:bg-red-700 border border-red-500 hover:border-red-700 text-sm font-semibold text-gray-600 hover:text-white rounded-md py-1.5 px-4 transition-all duration-300"
              >
                Delete
              </a>
            </div>
          </div>{' '}
          {/* // Item */}
          <div className="flex border border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-4 mb-2 rounded-xl">
            <div className="px-4">
              <span className="chain bsc">BSC</span>
            </div>
            <div className="px-4">
              0xC8E5823245c0041426C272628064075351C675e7
            </div>
            <div className="px-4 ml-auto">
              <a
                href="#"
                title="Edit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-1.5 px-4 transition-all duration-300"
              >
                Edit
              </a>
            </div>
            <div className="px-4">
              <a
                href="#"
                title="Edit"
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-1.5 px-4 transition-all duration-300"
              >
                Delete
              </a>
            </div>
          </div>
        </div>
        {/* End: Address list */}
      </div>
    </div>
  );
};
export default Dashboard;
