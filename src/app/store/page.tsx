import React from 'react';
const Store = () => {
  return (
    <>    
     <section className="px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-16 sm:pt-20">
          <div className="text-center p-6 sm:p-8 max-w-md sm:max-w-lg mx-auto">
            <div className="mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#7A1315] to-[#a11618] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                The Store Will Be Coming Soon
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                We're working hard to bring you an amazing shopping experience.
                Please check back later!
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="mb-6 sm:mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                <div className="bg-gradient-to-r from-[#7A1315] to-[#a11618] h-2 sm:h-3 rounded-full animate-pulse" style={{width: '65%'}}></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Store setup in progress...</p>
            </div>

            {/* Call to action */}
            <div className="space-y-3 sm:space-y-4">
              <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 text-base">
                Notify Me When Ready
              </button>
              <p className="text-xs sm:text-sm text-gray-400">
                Get notified when our store launches
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Store;