import React from 'react';
import ProductList from '../../components/ProductList';
import Navbar from '../../components/Navbar';
import ProductCategories from '../../components/productCatagories';
import ProductFilter from '../../components/ProductFilter';

const ProductsPage = () => {
  return (
    <div className="px-4">
      <Navbar />
      <section className='px-10 mt-20'>
        <ProductCategories />
      </section>
      
      {/* Products Section with Filter */}
      <section className="px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="md:w-1/4">
            <ProductFilter />
          </div>
          
          {/* Product Grid */}
          <div className="md:w-3/4">
            <ProductList />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;