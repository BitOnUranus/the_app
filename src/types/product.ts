export type ProductCategory = 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'nose-rings';
export type ProductMaterial = 'gold' | 'silver' | 'platinum' | 'white-gold' | 'rose-gold';
export type TryOnType = 'nose' | 'ears' | 'neck' | null;

export interface PositioningData {
  x: number;
  y: number;
  z: number;
  rotation: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  material: string;
  size: string;
  stockQuantity: number;
  imageUrls: string[];
  model3dUrl: string;
  tryOnEnabled: boolean;
  tryOnType: TryOnType;
  modelScale: number;
  positioningData: PositioningData | null;
  createdAt: string;
}