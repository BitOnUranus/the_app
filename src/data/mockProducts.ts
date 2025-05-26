import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings with a total of 1 carat weight. Perfect for everyday elegance.',
    price: 15000,
    category: 'earrings',
    material: 'gold',
    size: '5mm',
    stockQuantity: 10,
    imageUrls: [
      'https://images.pexels.com/photos/10909386/pexels-photo-10909386.jpeg',
      'https://images.pexels.com/photos/11638635/pexels-photo-11638635.jpeg'
    ],
    model3dUrl: '/models/diamond-studs.glb',
    tryOnEnabled: true,
    tryOnType: 'ears',
    modelScale: 1.0,
    positioningData: { x: 0, y: 0, z: 0, rotation: 0 },
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Sapphire Pendant Necklace',
    description: 'Elegant sapphire pendant necklace set in 18k white gold with diamond accents.',
    price: 22000,
    category: 'necklaces',
    material: 'white-gold',
    size: '18 inches',
    stockQuantity: 5,
    imageUrls: [
      'https://images.pexels.com/photos/12114719/pexels-photo-12114719.jpeg',
      'https://images.pexels.com/photos/10971177/pexels-photo-10971177.jpeg'
    ],
    model3dUrl: '/models/sapphire-necklace.glb',
    tryOnEnabled: true,
    tryOnType: 'neck',
    modelScale: 1.2,
    positioningData: { x: 0, y: 0, z: 0, rotation: 0 },
    createdAt: '2023-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Emerald Cut Engagement Ring',
    description: 'Stunning emerald cut diamond ring with a platinum band and pavé setting.',
    price: 35000,
    category: 'rings',
    material: 'platinum',
    size: '6',
    stockQuantity: 3,
    imageUrls: [
      'https://images.pexels.com/photos/5442447/pexels-photo-5442447.jpeg',
      'https://images.pexels.com/photos/10954429/pexels-photo-10954429.jpeg'
    ],
    model3dUrl: '/models/emerald-ring.glb',
    tryOnEnabled: false,
    tryOnType: null,
    modelScale: 1.0,
    positioningData: null,
    createdAt: '2023-01-03T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Pearl Drop Earrings',
    description: 'Elegant freshwater pearl drop earrings with 14k gold detailing.',
    price: 12000,
    category: 'earrings',
    material: 'gold',
    size: '8mm pearls',
    stockQuantity: 8,
    imageUrls: [
      'https://images.pexels.com/photos/10971171/pexels-photo-10971171.jpeg',
      'https://images.pexels.com/photos/10971167/pexels-photo-10971167.jpeg'
    ],
    model3dUrl: '/models/pearl-earrings.glb',
    tryOnEnabled: true,
    tryOnType: 'ears',
    modelScale: 1.1,
    positioningData: { x: 0, y: 0, z: 0, rotation: 0 },
    createdAt: '2023-01-04T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Gold Bangle Bracelet',
    description: 'Classic 18k gold bangle bracelet with a modern twist design.',
    price: 18000,
    category: 'bracelets',
    material: 'gold',
    size: 'Medium',
    stockQuantity: 6,
    imageUrls: [
      'https://images.pexels.com/photos/10971174/pexels-photo-10971174.jpeg',
      'https://images.pexels.com/photos/12114720/pexels-photo-12114720.jpeg'
    ],
    model3dUrl: '/models/gold-bangle.glb',
    tryOnEnabled: false,
    tryOnType: null,
    modelScale: 1.0,
    positioningData: null,
    createdAt: '2023-01-05T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Ruby Statement Necklace',
    description: 'Luxurious ruby statement necklace with diamond accents in 18k rose gold setting.',
    price: 45000,
    category: 'necklaces',
    material: 'rose-gold',
    size: '16 inches',
    stockQuantity: 2,
    imageUrls: [
      'https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg',
      'https://images.pexels.com/photos/12114719/pexels-photo-12114719.jpeg'
    ],
    model3dUrl: '/models/ruby-necklace.glb',
    tryOnEnabled: true,
    tryOnType: 'neck',
    modelScale: 1.3,
    positioningData: { x: 0, y: 0, z: 0, rotation: 0 },
    createdAt: '2023-01-06T00:00:00.000Z'
  },
  {
    id: '7',
    name: 'Diamond Tennis Bracelet',
    description: 'Classic diamond tennis bracelet with 5 carats of round brilliant diamonds.',
    price: 28000,
    category: 'bracelets',
    material: 'white-gold',
    size: '7 inches',
    stockQuantity: 4,
    imageUrls: [
      'https://images.pexels.com/photos/11025044/pexels-photo-11025044.jpeg',
      'https://images.pexels.com/photos/10970936/pexels-photo-10970936.jpeg'
    ],
    model3dUrl: '/models/tennis-bracelet.glb',
    tryOnEnabled: false,
    tryOnType: null,
    modelScale: 1.0,
    positioningData: null,
    createdAt: '2023-01-07T00:00:00.000Z'
  },
  {
    id: '8',
    name: 'Diamond Nose Stud',
    description: 'Delicate diamond nose stud in 14k yellow gold with a 0.1 carat diamond.',
    price: 5000,
    category: 'nose-rings',
    material: 'gold',
    size: '2mm',
    stockQuantity: 15,
    imageUrls: [
      'https://images.pexels.com/photos/10971158/pexels-photo-10971158.jpeg',
      'https://images.pexels.com/photos/10971166/pexels-photo-10971166.jpeg'
    ],
    model3dUrl: '/models/nose-stud.glb',
    tryOnEnabled: true,
    tryOnType: 'nose',
    modelScale: 0.8,
    positioningData: { x: 0, y: 0, z: 0, rotation: 0 },
    createdAt: '2023-01-08T00:00:00.000Z'
  }
];