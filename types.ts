
export interface Product {
  id: string;
  name: string;
  artist: string;
  price: number;
  description: string;
  category: string;
  color: 'blue' | 'pink' | 'orange' | 'purple';
  imageUrl: string;
  hoverImageUrl?: string; // Optional image to show on hover (e.g., product photo)
  discUrl?: string; // Optional custom artwork for the physical CD face
  features: string[];
  buyUrl: string;
}
