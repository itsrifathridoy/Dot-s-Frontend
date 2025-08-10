'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingCart, AlertCircle, ChevronDown, ChevronUp, Heart, Share2, ZoomIn, Check, Star, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ productData }: { productData: any }) {
  const { addToCart } = useCart();
  
  const thumbnails = productData?.images?.map((img: string) =>
    img.startsWith('/') ? img : `/${img}`
  ) || [
    '/Images/DotsSofa1.jpeg',
    '/Images/DotsSofa2.jpeg',
    '/Images/DotsSofa3.jpeg',
    '/Images/DotsSofa.jpeg',
  ];

  const [mainImage, setMainImage] = useState(
    productData?.image?.startsWith('/') ? productData.image : `/${productData?.image || thumbnails[0]}`
  );
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Off white');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [expandedConfigs, setExpandedConfigs] = useState<{ [key: string]: boolean }>({});
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    if (productData?.image) {
      setMainImage(productData.image);
    }
  }, [productData]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleQuantityChange = (increment: number) => {
    const newQuantity = quantity + increment;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const parsePrice = (priceString: string) => {
    return parseInt(priceString.replace(/[৳,\sBDT]/g, '')) || 12500;
  };

  const unitPrice = productData ? parsePrice(productData.price) : 12500;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const priceNumber = parsePrice(productData?.price || '৳ 12,500 BDT');
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: productData?.id?.toString() || `${Date.now()}-${Math.random()}`,
        name: productData?.title || 'Alder Ridge Table',
        price: priceNumber,
        imageUrl: mainImage,
        color: selectedColor
      });
    }
    
    // Show success feedback
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productData?.title || 'Check out this product',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const toggleConfig = (configKey: string) => {
    setExpandedConfigs(prev => ({
      ...prev,
      [configKey]: !prev[configKey]
    }));
  };

  const toggleShowAllOptions = () => {
    setShowAllOptions(prev => !prev);
  };

  const productSections = [
    {
      key: 'dimensions',
      title: 'Dimensions',
      subtitle: '(Length varies based on your selection)',
      content: (
        <div className="space-y-2 text-sm text-black">
          <p><strong>Length:</strong> 180-240 cm (varies by selection)</p>
          <p><strong>Width:</strong> 85 cm</p>
          <p><strong>Height:</strong> 75 cm</p>
          <p><strong>Weight:</strong> 20 kg</p>
        </div>
      )
    },
    {
      key: 'features',
      title: 'Features',
      content: (
        <ul className="space-y-1 text-sm text-black list-disc list-inside">
          <li>High-quality oak wood construction</li>
          <li>Smooth finish with protective coating</li>
          <li>Easy assembly with included hardware</li>
          <li>Scratch and water-resistant surface</li>
          <li>Modern design suitable for any decor</li>
        </ul>
      )
    },
    {
      key: 'care',
      title: 'Furniture Care Information',
      content: (
        <div className="space-y-2 text-sm text-black">
          <p><strong>Cleaning:</strong> Use a soft, damp cloth for regular cleaning</p>
          <p><strong>Protection:</strong> Avoid direct sunlight and excessive moisture</p>
          <p><strong>Maintenance:</strong> Apply wood polish every 6 months</p>
          <p><strong>Placement:</strong> Keep away from heat sources and air conditioning vents</p>
        </div>
      )
    },
    {
      key: 'warranty',
      title: 'Warranty',
      content: (
        <div className="space-y-2 text-sm text-black">
          <p><strong>Coverage:</strong> 2 years manufacturer warranty</p>
          <p><strong>Includes:</strong> Manufacturing defects and structural issues</p>
          <p><strong>Excludes:</strong> Normal wear and tear, misuse, or accidental damage</p>
          <p><strong>Claim Process:</strong> Contact customer service with purchase receipt</p>
        </div>
      )
    },
    {
      key: 'exchange',
      title: 'Exchange and Return',
      content: (
        <div className="space-y-2 text-sm text-black">
          <p><strong>Return Period:</strong> 7 days from delivery date</p>
          <p><strong>Condition:</strong> Item must be in original condition and packaging</p>
          <p><strong>Process:</strong> Contact customer service to initiate return</p>
          <p><strong>Refund:</strong> Full refund within 7-10 business days</p>
          <p><strong>Exchange:</strong> Available for size or color variations</p>
        </div>
      )
    },
    {
      key: 'upholstery',
      title: 'Upholstery Care Information',
      content: (
        <div className="space-y-2 text-sm text-black">
          <p><strong>Regular Care:</strong> Vacuum weekly with upholstery attachment</p>
          <p><strong>Spot Cleaning:</strong> Use mild soap and water for stains</p>
          <p><strong>Professional Cleaning:</strong> Recommended every 12-18 months</p>
          <p><strong>Fabric Protection:</strong> Apply fabric protector annually</p>
        </div>
      )
    },
    {
      key: 'story',
      title: 'Product Story',
      content: (
        <div className="space-y-2 text-sm text-black">
          <p>Crafted by skilled artisans using traditional woodworking techniques combined with modern design principles. Each piece is carefully selected from sustainable oak forests and finished to perfection.</p>
          <p>The Alder Ridge collection represents our commitment to quality, sustainability, and timeless design that will enhance your living space for years to come.</p>
        </div>
      )
    }
  ];

  const productConfigurations = [
    {
      key: 'fabric',
      title: 'Fabric',
      subtitle: 'Fabric configuration',
      icon: '🧵',
      options: [
        'Cotton Blend',
        'Linen',
        'Polyester',
        'Velvet'
      ]
    },
    {
      key: 'material',
      title: 'Material',
      subtitle: 'Material And Wood Finish',
      icon: '🪵',
      options: [
        'Oak Wood',
        'Mahogany',
        'Pine Wood',
        'Teak Wood'
      ]
    },
    {
      key: 'color',
      title: 'Color',
      subtitle: 'Material & Wood Finish Color',
      icon: '🎨',
      colorVariants: [
        {
          name: 'Natural Brown',
          image: '/Images/DotsSofa.jpeg',
          link: '/IndividualProduct/1'
        },
        {
          name: 'Dark Walnut',
          image: '/Images/DotsSofa1.jpeg',
          link: '/IndividualProduct/2'
        },
        {
          name: 'Light Oak',
          image: '/Images/DotsSofa2.jpeg',
          link: '/IndividualProduct/3'
        },
        {
          name: 'Black Finish',
          image: '/Images/DotsSofa3.jpeg',
          link: '/IndividualProduct/4'
        }
      ]
    },
    {
      key: 'size',
      title: 'Size',
      subtitle: 'Material Size',
      icon: '📏',
      sizeVariants: [
        {
          name: 'Small (120cm)',
          price: '৳ 10,500 BDT',
          image: '/Images/DotsSofa.jpeg',
          link: '/IndividualProduct/5'
        },
        {
          name: 'Medium (150cm)',
          price: '৳ 12,500 BDT',
          image: '/Images/DotsSofa1.jpeg',
          link: '/IndividualProduct/1'
        },
        {
          name: 'Large (180cm)',
          price: '৳ 15,500 BDT',
          image: '/Images/DotsSofa2.jpeg',
          link: '/IndividualProduct/6'
        },
        {
          name: 'Extra Large (210cm)',
          price: '৳ 18,500 BDT',
          image: '/Images/DotsSofa3.jpeg',
          link: '/IndividualProduct/7'
        }
      ]
    },
    {
      key: 'set',
      title: 'Set',
      subtitle: 'Set Option',
      icon: '🛋️',
      setOptions: [
        {
          name: 'Alder Ridge Table',
          price: '৳ 12,500 BDT',
          image: '/Images/DotsSofa.jpeg',
          link: '/IndividualProduct/1'
        },
        {
          name: 'Matching Chair Set',
          price: '৳ 8,500 BDT',
          image: '/Images/DotsSofa1.jpeg',
          link: '/IndividualProduct/1'
        },
        {
          name: 'Storage Cabinet',
          price: '৳ 15,000 BDT',
          image: '/Images/DotsSofa2.jpeg',
          link: '/IndividualProduct/1'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery Section */}
            <div className="lg:w-3/5 p-6 lg:p-8">
              {/* Main Image with Enhanced Styling */}
              <motion.div
                className="relative mb-6 group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl border-4 border-gray-100 shadow-2xl bg-gradient-to-br from-gray-50 to-white"
                  onMouseEnter={() => setZoom(true)}
                  onMouseLeave={() => setZoom(false)}
                  onMouseMove={handleMouseMove}
                >
                  <Image
                    src={mainImage}
                    alt="Main Product"
                    fill
                    className={`object-cover transition-all duration-500 ${zoom ? 'scale-150' : 'scale-100'}`}
                    style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
                  />
                  
                  {/* Zoom indicator */}
                  <AnimatePresence>
                    {zoom && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <ZoomIn className="w-4 h-4" />
                        Zoom Active
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Gradient overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>

              {/* Thumbnail Gallery with Enhanced Design */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {thumbnails.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className={`cursor-pointer border-2 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      mainImage === src 
                        ? 'ring-4 ring-[#7A1315] border-[#7A1315] shadow-lg scale-110' 
                        : 'border-gray-200 hover:border-[#7A1315] hover:shadow-md'
                    }`}
                    onClick={() => setMainImage(src)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image 
                      src={src} 
                      alt={`Product view ${idx + 1}`} 
                      width={100} 
                      height={80} 
                      className="object-cover w-20 h-16 sm:w-24 sm:h-20" 
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product Information Section */}
            <div className="lg:w-2/5 p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 border-l border-gray-200/50">
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <motion.h1 
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {productData?.title || 'Alder Ridge Table'}
                    </motion.h1>
                    <p className="text-sm text-gray-500 font-medium">{productData?.sku || 'HIF-201-313-10-1-88'}</p>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 ml-4">
                    <motion.button
                      onClick={toggleWishlist}
                      className={`p-3 rounded-full border-2 transition-all duration-300 ${
                        isWishlisted 
                          ? 'bg-[#7A1315] border-[#7A1315] text-white' 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#7A1315] hover:text-[#7A1315]'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </motion.button>
                    
                    <motion.button
                      onClick={handleShare}
                      className="p-3 rounded-full border-2 bg-white border-gray-200 text-gray-600 hover:border-[#7A1315] hover:text-[#7A1315] transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8/5 from 124 reviews)</span>
                </div>

                {/* Price */}
                <motion.div 
                  className="bg-gradient-to-r from-[#7A1315]/10 to-[#a11618]/10 rounded-2xl p-4 border border-[#7A1315]/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text text-transparent">
                        {productData?.price || '৳ 18,900 BDT'}
                      </span>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="line-through mr-2">৳ 22,000 BDT</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Save 14%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>In Stock</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Product Configuration */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-[#7A1315] to-[#a11618] rounded-full"></span>
                  Customization Options
                </h3>
                
                <div className="space-y-3">
                  {(showAllOptions ? productConfigurations : productConfigurations.slice(0, 2)).map((config) => (
                    <motion.div 
                      key={config.key} 
                      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <button
                        onClick={() => toggleConfig(config.key)}
                        className="flex justify-between items-center w-full text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{config.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{config.title}</h4>
                            <p className="text-xs text-gray-500">{config.subtitle}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-[#7A1315] transition-transform duration-300 ${expandedConfigs[config.key] ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedConfigs[config.key] && (
                          <motion.div 
                            className="mt-4 pt-4 border-t border-gray-100"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {config.key === 'color' && config.colorVariants ? (
                              <div className="grid grid-cols-2 gap-3">
                                {config.colorVariants.map((variant, index) => (
                                  <Link key={index} href={variant.link} className="group">
                                    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl border border-gray-100 transition-all duration-200 group-hover:border-[#7A1315]">
                                      <Image src={variant.image} alt={variant.name} width={40} height={40} className="object-cover rounded-lg" />
                                      <span className="font-medium text-sm text-gray-700 group-hover:text-[#7A1315]">{variant.name}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : config.key === 'size' && config.sizeVariants ? (
                              <div className="space-y-3">
                                {config.sizeVariants.map((variant, index) => (
                                  <Link key={index} href={variant.link} className="group">
                                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl border border-gray-100 transition-all duration-200 group-hover:border-[#7A1315]">
                                      <div className="flex items-center gap-3">
                                        <Image src={variant.image} alt={variant.name} width={40} height={40} className="object-cover rounded-lg" />
                                        <span className="font-medium text-sm text-gray-700 group-hover:text-[#7A1315]">{variant.name}</span>
                                      </div>
                                      <span className="font-bold text-sm text-[#7A1315]">{variant.price}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : config.options ? (
                              <div className="grid grid-cols-2 gap-2">
                                {config.options.map((option, index) => (
                                  <button key={index} className="text-left p-3 hover:bg-gray-50 rounded-xl text-sm border border-gray-100 text-gray-700 hover:border-[#7A1315] hover:text-[#7A1315] transition-all duration-200">
                                    {option}
                                  </button>
                                ))}
                              </div>
                            ) : null}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                  
                  {productConfigurations.length > 2 && (
                    <motion.button 
                      onClick={toggleShowAllOptions}
                      className="w-full text-[#7A1315] text-sm font-semibold py-3 border-2 border-[#7A1315] rounded-xl hover:bg-[#7A1315] hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {showAllOptions 
                        ? `Show Less Options` 
                        : `View All Options (${productConfigurations.length - 2} more)`
                      }
                    </motion.button>
                  )}
                </div>
              </motion.div>
              
              {/* Quantity and Add to Cart */}
              <motion.div 
                className="space-y-6 pt-6 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">Quantity</label>
                  <div className="flex items-center justify-center bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-3 shadow-sm">
                    <motion.button 
                      className="w-10 h-10 bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                      onClick={() => handleQuantityChange(-1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <span className="mx-8 font-bold text-2xl text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                    <motion.button 
                      className="w-10 h-10 bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                      onClick={() => handleQuantityChange(1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <motion.button 
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isAddedToCart}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <AnimatePresence mode="wait">
                    {isAddedToCart ? (
                      <motion.div
                        key="added"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-6 h-6" />
                        Added to Cart!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="add"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="w-6 h-6" />
                        Add To Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                
                {/* Price Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Unit Price:</span>
                      <span className="font-semibold">৳ {unitPrice.toLocaleString()} BDT</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Quantity:</span>
                      <span className="font-semibold">{quantity} items</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="bg-gradient-to-r from-[#7A1315] to-[#a11618] bg-clip-text text-transparent">৳ {totalPrice.toLocaleString()} BDT</span>
                    </div>
                  </div>
                </div>
                
                {/* Policies */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Peace of Mind Guarantee</p>
                      <p>7-day return policy • Free delivery • 2-year warranty included</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Product Information Sections */}
        <motion.div 
          className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-[#7A1315] to-[#a11618] px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Product Information & Details
            </h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              {productSections.map((section, index) => (
                <motion.div 
                  key={section.key} 
                  className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="flex justify-between items-center w-full p-4 text-left bg-gradient-to-r from-gray-50 to-white hover:from-[#7A1315]/5 hover:to-[#a11618]/5 transition-all duration-300 group"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base group-hover:text-[#7A1315] transition-colors duration-300">{section.title}</h3>
                      {section.subtitle && (
                        <span className="text-sm text-gray-500 group-hover:text-[#7A1315]/70 transition-colors duration-300">{section.subtitle}</span>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className={`w-8 h-8 rounded-full border-2 border-[#7A1315] flex items-center justify-center transition-all duration-300 ${expandedSections[section.key] ? 'bg-[#7A1315] text-white rotate-180' : 'text-[#7A1315] group-hover:bg-[#7A1315] group-hover:text-white'}`}>
                        {expandedSections[section.key] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections[section.key] && (
                      <motion.div 
                        className="border-t border-gray-200 bg-white"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Related Products or Reviews Section */}
        <motion.div 
          className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              Customer Reviews & Ratings
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rating Summary */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">4.8</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on 124 reviews</p>
                </div>
                
                {/* Rating bars */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-2">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500`}
                          style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 2 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{rating === 5 ? '87' : rating === 4 ? '25' : rating === 3 ? '10' : rating === 2 ? '2' : '0'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Recent Reviews</h3>
                <div className="space-y-4">
                  {[
                    { name: "Sarah M.", rating: 5, comment: "Absolutely love this piece! Great quality and looks exactly as pictured.", date: "2 days ago" },
                    { name: "David L.", rating: 5, comment: "Excellent craftsmanship. Delivery was prompt and the packaging was perfect.", date: "1 week ago" },
                    { name: "Emily R.", rating: 4, comment: "Beautiful furniture, exactly what I was looking for. Slightly expensive but worth it.", date: "2 weeks ago" }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#7A1315] to-[#a11618] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {review.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{review.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}