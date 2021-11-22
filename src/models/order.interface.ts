import { ProductBase } from './product.interface';

export interface OrderBase {
  total: number,
  products: ProductBase[],
}

export interface Order extends OrderBase{
  id: number
}
