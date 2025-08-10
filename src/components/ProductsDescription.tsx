import React from 'react';

interface Product {
    name: string;
    price: number;
    color: string;
    wood: string;
    estimatedDelivery: string;
    descriptionPoints: string[];
    weightKg: number;
    images: string[]; // Array of image URLs
}

interface Props {
    product: Product;
}

const ProductsDescription: React.FC<Props> = ({
    product = {
        name: 'Alder Ridge Table',
        price: 12500,
        color: 'off white',
        wood: 'Oak',
        estimatedDelivery: 'Estimated Delivery Time: 2 Weeks',
        descriptionPoints: [
            'Made with High Quality Wood',
            'Nice Finishing',
            'Lather of Paris',
            '20 kg',
        ],
        weightKg: 20,
        images: [
            'Images.Table.jpg',
            'Images.Table.jpg',
            'Images.Table.jpg',
        ],
    },
}) => {
    const [quantity, setQuantity] = React.useState(2);
    const [mainImage, setMainImage] = React.useState(product.images[0]);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleThumbnailClick = (image: string) => {
        setMainImage(image);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 sm:p-6 font-sans max-w-7xl mx-auto">
            <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-32 overflow-x-auto lg:overflow-y-auto mb-4 lg:mb-0">
                {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Product Thumbnail ${index + 1}`}
                        className={`w-16 h-16 sm:w-20 sm:h-20 object-cover border border-gray-300 cursor-pointer opacity-70 transition-opacity duration-300 ease-in-out flex-shrink-0 ${
                            mainImage === image ? 'opacity-100 border-red-600 border-2' : ''
                        }`}
                        onClick={() => handleThumbnailClick(image)}
                    />
                ))}
            </div>
            <div className="flex-1">
                <div className="mb-4">
                    <img src={mainImage} alt={product.name} className="w-full h-auto max-h-64 sm:max-h-80 lg:max-h-96 object-contain" />
                </div>
                <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mb-1 break-words">{product.name}</h2>
                    <p className="text-black text-xs sm:text-sm mb-2 break-words">Add a touch of satisfaction with Alder ridge Table</p>
                    <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.176-6.545L.587 6.95 6.95.588 10 4.061 13.05.588 19.413 6.95l-5.878 3.09 1.176 6.545z"/>
                            </svg>
                        ))}
                        <span className="text-black ml-2 text-xs sm:text-sm">120 Reviews</span>
                    </div>
                    <div className="text-base sm:text-lg lg:text-xl text-red-600 mb-3 font-semibold">৳ {product.price.toLocaleString()} BDT</div>
                    <div className="mb-2 text-xs sm:text-sm lg:text-base flex items-center">
                        <span className="text-black">Color: </span>
                        <span className="inline-block w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 ml-1 flex-shrink-0" style={{ backgroundColor: product.color }}></span> 
                        <span className="ml-1 break-words text-black">{product.color}</span>
                    </div>
                    <div className="mb-2 text-xs sm:text-sm lg:text-base break-words text-black">Wood: {product.wood}</div>
                    <div className="mb-2 text-xs sm:text-sm lg:text-base break-words text-black">{product.estimatedDelivery}</div>
                    <div className="mt-4 mb-3">
                        <h3 className="font-semibold text-black mb-1 text-sm sm:text-base">About this item:</h3>
                        <ul className="list-disc list-inside text-black text-sm sm:text-base">
                            {product.descriptionPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4 text-sm sm:text-base text-black">Weight: {product.weightKg} kg</div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4">
                        <div className="flex items-center border border-red-600 rounded-md overflow-hidden w-full sm:w-auto">
                            <button
                                onClick={handleDecrement}
                                className="px-3 py-2 text-red-600 hover:bg-red-100 focus:outline-none flex-1 sm:flex-none"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 text-red-700 text-center flex-1 sm:flex-none">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                className="px-3 py-2 text-red-600 hover:bg-red-100 focus:outline-none flex-1 sm:flex-none"
                            >
                                +
                            </button>
                        </div>
                        <button className="bg-red-600 text-white py-2 px-4 sm:px-6 rounded-md hover:bg-red-700 focus:outline-none w-full sm:w-auto">
                            Add To Cart
                        </button>
                        <div className="text-sm text-black text-center sm:text-left">৳ 25,000 BDT</div>
                    </div>
                    <div className="flex items-center text-sm text-black mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.5 14.25a.75.75 0 01-1.5 0v-3a.75.75 0 011.5 0v3zM12 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        7 day return policy
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-6">
                <h3 className="text-base sm:text-lg font-semibold text-black mb-3">All Terms And Conditions:</h3>
                <ol className="list-decimal list-inside text-black text-xs sm:text-sm space-y-2">
                    <li>All orders are subject to product availability. We reserve the right to cancel any order due to stock issues, pricing errors, or suspicious activity.</li>
                    <li>Returns are accepted within 7 days for unused/unassembled items in original packaging. Custom-made or clearance items are final sale. Refunds exclude shipping costs.</li>
                    <li>We strive for accuracy, but colors/materials may vary slightly due to screen settings. Dimensions and weights are approximate.</li>
                    <li>We are not liable for indirect damages (e.g., lost profits) arising from product use. Liability is capped at the purchase price. Customer data (payment, contact info) is secured and never sold. See our full [Privacy Policy] for details.</li>
                    <li>These terms are governed by the laws of Bangladesh. Disputes will be resolved in courts.</li>
                </ol>
            </div>
        </div>
    );
};

export default ProductsDescription;