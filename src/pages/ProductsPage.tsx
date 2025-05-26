import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import ProductGrid from '../components/product/ProductGrid';
import { Product } from '../types/product';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get filter parameters from URL
  const categoryParam = searchParams.get('category');
  const materialParam = searchParams.get('material');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const filterParam = searchParams.get('filter');
  const searchParam = searchParams.get('search');
  
  const minPrice = minPriceParam ? parseInt(minPriceParam) : 0;
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : 100000;
  
  useEffect(() => {
    // Update document title
    document.title = 'Shop Jewelry - JewelAR';
  }, []);
  
  useEffect(() => {
    if (isLoading) return;
    
    let result = [...products];
    
    // Apply category filter
    if (categoryParam) {
      result = result.filter(product => product.category === categoryParam);
    }
    
    // Apply material filter
    if (materialParam) {
      result = result.filter(product => product.material === materialParam);
    }
    
    // Apply price range filter
    result = result.filter(product => product.price >= minPrice && product.price <= maxPrice);
    
    // Apply try-on filter
    if (filterParam === 'tryOnEnabled') {
      result = result.filter(product => product.tryOnEnabled);
    }
    
    // Apply search
    if (searchParam) {
      const search = searchParam.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(search) || 
        product.description.toLowerCase().includes(search)
      );
    }
    
    setFilteredProducts(result);
  }, [products, isLoading, categoryParam, materialParam, minPrice, maxPrice, filterParam, searchParam]);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', e.target.value);
    }
    setSearchParams(searchParams);
  };
  
  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      searchParams.delete('material');
    } else {
      searchParams.set('material', e.target.value);
    }
    setSearchParams(searchParams);
  };
  
  const handlePriceChange = (min: number, max: number) => {
    searchParams.set('minPrice', min.toString());
    searchParams.set('maxPrice', max.toString());
    setSearchParams(searchParams);
  };
  
  const handleTryOnFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      searchParams.set('filter', 'tryOnEnabled');
    } else {
      searchParams.delete('filter');
    }
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      searchParams.delete('search');
    } else {
      searchParams.set('search', e.target.value);
    }
    setSearchParams(searchParams);
  };
  
  const clearFilters = () => {
    setSearchParams({});
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop Our Collection</h1>
          <button 
            className="md:hidden flex items-center text-gray-600 hover:text-amber-600"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className={`md:block md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-amber-600 hover:text-amber-700"
                >
                  Clear All
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchParam || ''}
                  onChange={handleSearch}
                  placeholder="Search jewelry..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={categoryParam || ''}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">All Categories</option>
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelets">Bracelets</option>
                  <option value="nose-rings">Nose Rings</option>
                </select>
              </div>
              
              {/* Material Filter */}
              <div className="mb-6">
                <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <select
                  id="material"
                  value={materialParam || ''}
                  onChange={handleMaterialChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">All Materials</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="platinum">Platinum</option>
                  <option value="white-gold">White Gold</option>
                  <option value="rose-gold">Rose Gold</option>
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="minPrice" className="sr-only">Min Price</label>
                    <input
                      type="number"
                      id="minPrice"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => handlePriceChange(parseInt(e.target.value) || 0, maxPrice)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="sr-only">Max Price</label>
                    <input
                      type="number"
                      id="maxPrice"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => handlePriceChange(minPrice, parseInt(e.target.value) || 100000)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Try-On Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filterParam === 'tryOnEnabled'}
                    onChange={handleTryOnFilterChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">AR Try-On Available</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Sorting and Results Count */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center">
                <SlidersHorizontal size={18} className="text-gray-600 mr-2" />
                <select
                  className="py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;