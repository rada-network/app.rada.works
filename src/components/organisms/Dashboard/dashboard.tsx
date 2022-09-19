import React from 'react';

const Dashboard = (props: any) => {
  const { walletAddress } = props;

  return (
    <div className="">
      <div className="container max-w-screen-xl mx-auto py-12 lg:py-24">
        Dashboard: {walletAddress}
        {/* Address list */}
        <div className="border-t border-gray-200">
          <div className="flex border-b border-gray-200 hover:bg-gray-50 py-4">
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
                className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2 px-4 transition-all duration-300"
              >
                Edit
              </a>
            </div>
            <div className="px-4">
              <a
                href="#"
                title="Edit"
                className="bg-red-600 hover:bg-red-700 text-white rounded py-2 px-4 transition-all duration-300"
              >
                Delete
              </a>
            </div>
          </div>

          <div className="flex border-b border-gray-200 hover:bg-gray-50 py-4">
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
                className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2 px-4 transition-all duration-300"
              >
                Edit
              </a>
            </div>
            <div className="px-4">
              <a
                href="#"
                title="Edit"
                className="bg-red-600 hover:bg-red-700 text-white rounded py-2 px-4 transition-all duration-300"
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
