export interface ProductBase {
  name: string,
  price: number,
  quantity: number
}

export interface Product extends ProductBase {
  id: number
}
