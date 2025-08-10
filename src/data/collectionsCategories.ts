export const productsData = [
  {
    name: 'Sofa',
    items: ['L-Shape Sofa', 'Sectional Sofa', 'Recliner Sofa', '3-Seater Sofa', '2-Seater Sofa', 'Loveseat']
  },
  {
    name: 'Tables',
    items: ['Coffee Table', 'Center Table', 'Side Table', 'Console Table', 'Nesting Tables']
  },
  {
    name: 'Storage',
    items: ['TV Cabinet', 'Display Unit', 'Bookshelf', 'Storage Ottoman', 'Media Console']
  },
  {
    name: 'Beds',
    items: ['King Size Bed', 'Queen Size Bed', 'Single Bed', 'Double Bed', 'Platform Bed', 'Storage Bed']
  },
  {
    name: 'Wardrobes',
    items: ['Wardrobe', 'Chest of Drawers', 'Dresser', 'Nightstand', 'Armoire']
  },
  {
    name: 'Seating',
    items: ['Dining Chair', 'Bar Stool', 'Counter Stool', 'Bench', 'Accent Chair', 'Bedroom Chair', 'Vanity Stool', 'Ottoman']
  },
  {
    name: 'Dining Sets',
    items: ['4-Seater Dining Set', '6-Seater Dining Set', '8-Seater Dining Set', 'Round Dining Set', 'Extendable Dining Set']
  },
  {
    name: 'Office Furniture',
    items: ['Executive Desk', 'Office Chair', 'Conference Table', 'Filing Cabinet', 'Bookshelf']
  }
];
// Shared collections categories data for both desktop and mobile nav
// Reorganized hierarchical structure

export const collectionsData = [
  {
    name: 'Living',
    image: '/Images/Living room.jpg',
    categories: [
      {
        name: 'Sofa Set',
        image: '/Images/DotsSofa.jpeg',
        subcategories: [
          { name: 'Fabric Sofa', image: '/Images/DotsSofa.jpeg' },
          { name: 'Wooden Sofa', image: '/Images/DotsSofa2.jpeg' },
          { name: 'L-Shaped Sofa', image: '/Images/DotsSofa3.jpeg' },
          { name: 'Leather Sofa', image: '/Images/DotsSofa6.jpeg' },
          { name: 'Rexin Sofa', image: '/Images/DotsSofa7.jpeg' },
          { name: 'Sofa-Bed', image: '/Images/DotsSofa8.jpeg' },
          { name: '3-Seater Sofa', image: '/Images/DotsSofa9.jpeg' },
          { name: '2-Seater Sofa', image: '/Images/DotsSofa10.jpeg' },
          { name: 'Single Seater', image: '/Images/DotsSofa11.jpeg' },
          { name: 'Modular Sofa', image: '/Images/DotsSofa12.jpeg' }
        ]
      },
      {
        name: 'Center Table',
        image: '/Images/Table.jpg',
        subcategories: [
          { name: 'Center Table With Glass Top', image: '/Images/Table.jpg' },
          { name: 'Center Table With Wooden Top', image: '/Images/Table.jpg' },
          { name: 'Center Table With Storage', image: '/Images/Table.jpg' },
          { name: 'Corner Table', image: '/Images/Table.jpg' },
          { name: 'Modular Center Table', image: '/Images/Table.jpg' }
        ]
      },
      {
        name: 'TV Cabinet',
        image: '/Images/Drawing.jpeg',
        subcategories: [
          { name: 'TV Cabinet With Hanging Unit', image: '/Images/Drawing.jpeg' },
          { name: 'Low Height TV Cabinet', image: '/Images/Drawing.jpeg' },
          { name: 'Modular TV Cabinet', image: '/Images/Drawing.jpeg' }
        ]
      },
      {
        name: 'Divan',
        image: '/Images/Devan-1.jpeg',
        subcategories: [
          { name: 'Fabric Divan', image: '/Images/Devan-1.jpeg' },
          { name: 'Wooden Divan', image: '/Images/Devan-2.jpeg' },
          { name: 'Modular Divan', image: '/Images/Devan-3.jpeg' }
        ]
      },
      {
        name: 'Shoe Rack',
        image: '/Images/Drawing.jpeg',
        subcategories: [
          { name: 'Storage Shoe Rack', image: '/Images/Drawing.jpeg' },
          { name: 'Shoe Rack With Mirror', image: '/Images/Drawing.jpeg' },
          { name: 'Cradle Shoe Rack', image: '/Images/Drawing.jpeg' }
        ]
      }
    ]
  },
  {
    name: 'Bedroom',
    image: '/BedroomFinal.jpeg',
    categories: [
      {
        name: 'Bed Set',
        image: '/Images/Bed.jpg',
        subcategories: [
          { name: 'King Size Bed', image: '/Images/Bed-1.jpeg' },
          { name: 'Queen Size Bed', image: '/Images/Bed-2.jpeg' },
          { name: 'Single Bed', image: '/Images/Bed-3.jpeg' },
          { name: 'Double Bed', image: '/Images/Bed-4.jpeg' },
          { name: 'Platform Bed', image: '/Images/Bed-5.jpeg' },
          { name: 'Storage Bed', image: '/Images/Bed-6.jpeg' }
        ]
      },
      {
        name: 'Wardrobe',
        image: '/Images/BedRoom.jpeg',
        subcategories: [
          { name: '2-Door Wardrobe', image: '/Images/BedRoom.jpeg' },
          { name: '3-Door Wardrobe', image: '/Images/BedRoom.jpeg' },
          { name: 'Sliding Wardrobe', image: '/Images/BedRoom.jpeg' },
          { name: 'Corner Wardrobe', image: '/Images/BedRoom.jpeg' },
          { name: 'Modular Wardrobe', image: '/Images/BedRoom.jpeg' }
        ]
      },
      {
        name: 'Dresser',
        image: '/Images/BedRoom.jpeg',
        subcategories: [
          { name: 'Wooden Dresser', image: '/Images/BedRoom.jpeg' },
          { name: 'Modern Dresser', image: '/Images/BedRoom.jpeg' },
          { name: 'Dresser with Mirror', image: '/Images/BedRoom.jpeg' }
        ]
      },
      {
        name: 'Nightstand',
        image: '/Images/BedRoom.jpeg',
        subcategories: [
          { name: 'Single Drawer Nightstand', image: '/Images/BedRoom.jpeg' },
          { name: 'Double Drawer Nightstand', image: '/Images/BedRoom.jpeg' },
          { name: 'Open Shelf Nightstand', image: '/Images/BedRoom.jpeg' }
        ]
      }
    ]
  },
  {
    name: 'Dining',
    image: '/Images/Dining-Room.webp',
    categories: [
      {
        name: 'Dining Set',
        image: '/Images/Dining-Room.webp',
        subcategories: [
          { name: '4-Seater Dining Set', image: '/Images/Dining-Room.webp' },
          { name: '6-Seater Dining Set', image: '/Images/Dining-Room.webp' },
          { name: '8-Seater Dining Set', image: '/Images/Dining-Room.webp' },
          { name: 'Round Dining Set', image: '/Images/Dining-Room.webp' },
          { name: 'Extendable Dining Set', image: '/Images/Dining-Room.webp' }
        ]
      },
      {
        name: 'Dining Chair',
        image: '/Images/Dining-Room.webp',
        subcategories: [
          { name: 'Wooden Chair', image: '/Images/Dining-Room.webp' },
          { name: 'Cushioned Chair', image: '/Images/Dining-Room.webp' },
          { name: 'Bar Stool', image: '/Images/Dining-Room.webp' },
          { name: 'Counter Stool', image: '/Images/Dining-Room.webp' }
        ]
      },
      {
        name: 'Dining Table',
        image: '/Images/Dining-Room.webp',
        subcategories: [
          { name: 'Rectangular Table', image: '/Images/Dining-Room.webp' },
          { name: 'Round Table', image: '/Images/Dining-Room.webp' },
          { name: 'Extendable Table', image: '/Images/Dining-Room.webp' },
          { name: 'Glass Top Table', image: '/Images/Dining-Room.webp' }
        ]
      }
    ]
  },
  {
    name: 'Kitchen',
    image: '/Images/Kitchen.png',
    categories: [
      {
        name: 'Kitchen Cabinet',
        image: '/Images/Kitchen.png',
        subcategories: [
          { name: 'Upper Cabinet', image: '/Images/Kitchen.png' },
          { name: 'Base Cabinet', image: '/Images/Kitchen.png' },
          { name: 'Tall Cabinet', image: '/Images/Kitchen.png' },
          { name: 'Corner Cabinet', image: '/Images/Kitchen.png' }
        ]
      },
      {
        name: 'Kitchen Island',
        image: '/Images/Kitchen.png',
        subcategories: [
          { name: 'Mobile Island', image: '/Images/Kitchen.png' },
          { name: 'Fixed Island', image: '/Images/Kitchen.png' },
          { name: 'Island with Storage', image: '/Images/Kitchen.png' }
        ]
      },
      {
        name: 'Bar Stool',
        image: '/Images/Kitchen.png',
        subcategories: [
          { name: 'Adjustable Stool', image: '/Images/Kitchen.png' },
          { name: 'Fixed Height Stool', image: '/Images/Kitchen.png' },
          { name: 'Swivel Stool', image: '/Images/Kitchen.png' }
        ]
      }
    ]
  },
  {
    name: 'Study Room',
    image: '/Images/Study.avif',
    categories: [
      {
        name: 'Study Table',
        image: '/Images/Study.avif',
        subcategories: [
          { name: 'Computer Desk', image: '/Images/Study.avif' },
          { name: 'Writing Desk', image: '/Images/Study.avif' },
          { name: 'L-Shaped Desk', image: '/Images/Study.avif' },
          { name: 'Standing Desk', image: '/Images/Study.avif' }
        ]
      },
      {
        name: 'Office Chair',
        image: '/Images/Study.avif',
        subcategories: [
          { name: 'Executive Chair', image: '/Images/Study.avif' },
          { name: 'Task Chair', image: '/Images/Study.avif' },
          { name: 'Ergonomic Chair', image: '/Images/Study.avif' },
          { name: 'Gaming Chair', image: '/Images/Study.avif' }
        ]
      },
      {
        name: 'Bookshelf',
        image: '/Images/Study.avif',
        subcategories: [
          { name: 'Wall Mounted Bookshelf', image: '/Images/Study.avif' },
          { name: 'Standing Bookshelf', image: '/Images/Study.avif' },
          { name: 'Corner Bookshelf', image: '/Images/Study.avif' }
        ]
      }
    ]
  },
  {
    name: 'Office',
    image: '/Images/office.jpg',
    categories: [
      {
        name: 'Executive Desk',
        image: '/Images/office.jpg',
        subcategories: [
          { name: 'L-Shaped Desk', image: '/Images/office.jpg' },
          { name: 'Straight Desk', image: '/Images/office.jpg' },
          { name: 'U-Shaped Desk', image: '/Images/office.jpg' }
        ]
      },
      {
        name: 'Conference Table',
        image: '/Images/office.jpg',
        subcategories: [
          { name: 'Rectangular Conference Table', image: '/Images/office.jpg' },
          { name: 'Round Conference Table', image: '/Images/office.jpg' },
          { name: 'Oval Conference Table', image: '/Images/office.jpg' }
        ]
      },
      {
        name: 'Storage Unit',
        image: '/Images/office.jpg',
        subcategories: [
          { name: 'Filing Cabinet', image: '/Images/office.jpg' },
          { name: 'Storage Cupboard', image: '/Images/office.jpg' },
          { name: 'Mobile Pedestal', image: '/Images/office.jpg' }
        ]
      }
    ]
  },
  {
    name: 'Institutional',
    image: '/Images/Hospital.jpg',
    categories: [
      {
        name: 'Waiting Chair',
        image: '/Images/Hospital.jpg',
        subcategories: [
          { name: 'Single Seater Waiting Chair', image: '/Images/Hospital.jpg' },
          { name: 'Double Seater Waiting Chair', image: '/Images/Hospital.jpg' },
          { name: 'Triple Seater Waiting Chair', image: '/Images/Hospital.jpg' }
        ]
      },
      {
        name: 'Reception Desk',
        image: '/Images/Hospital.jpg',
        subcategories: [
          { name: 'L-Shaped Reception', image: '/Images/Hospital.jpg' },
          { name: 'Straight Reception', image: '/Images/Hospital.jpg' },
          { name: 'Curved Reception', image: '/Images/Hospital.jpg' }
        ]
      }
    ]
  }
];
