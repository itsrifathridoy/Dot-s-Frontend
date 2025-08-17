import React from 'react';
import ProductList from '../../components/productlist';
import HomeCategories from '../../components/homecategories';
import IndustrialCatagories from '../../components/industrialcategories';
import ProductCatagories from '../../components/productcategories';

const CollectionsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      

      {/* Featured Home Collections Section */}
      <section className="p-6 sm:p-8 lg:p-10">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-6">
            <div className="flex flex-col">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text leading-tight tracking-tight">
                Our Complete <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text">Collections</span>
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] mt-4 rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-2xl">
              Discover our comprehensive range of premium furniture designed to transform every space in your home and office
              </p>
            </div>
          </div>
       <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 p-6 sm:p-8 border border-gray-100">
            
            <HomeCategories />
            <IndustrialCatagories />

          </div>
      </section>


      {/* Product Categories Sections */}
      <section className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-16 sm:space-y-20">
          
          {/* House Collections */}
          <div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-6">
              <div className="flex flex-col">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text leading-tight tracking-tight">
                  House <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text">Collections</span>
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] mt-4 rounded-full"></div>
                <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-2xl">
                  Browse through our extensive range of home furniture organized by room and style
                </p>
              </div>
            
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl shadow-gray-100 p-6 sm:p-8 border border-gray-100">
              <ProductCatagories />
            </div>
          </div>

          {/* Office Collections */}
          <div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 gap-6">
              <div className="flex flex-col">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text leading-tight tracking-tight">
                  Office <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text">Collections</span>
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#7A1315] to-[#a11618] mt-4 rounded-full"></div>
                <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-2xl">
                  Professional workspace solutions designed to enhance productivity and comfort
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl shadow-gray-100 p-6 sm:p-8 border border-gray-100">
              <ProductCatagories />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;