import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProductBase } from '../models/product.interface';
import { productRule } from '../rules';

// eslint-disable-next-line new-cap
export const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response) => {
  const result = await productRule.getProducts();
  if (result) {
    res.status(StatusCodes.OK).send(result);
  } else {
    res.status(StatusCodes.NOT_FOUND);
  }
});

productRouter.get('/:id', async (req: Request, res: Response) => {
  const productName = req.params.id;
  const result = await productRule.getProductByName(productName);
  if (result) {
    res.status(StatusCodes.OK).send(result);
  } else {
    res.status(StatusCodes.NOT_FOUND);
  }
});

productRouter.post('/', async (req: Request, res: Response) => {
  const inputData: ProductBase = req.body;
  const result = await productRule.saveProduct(inputData);
  res.status(StatusCodes.CREATED).send(result);
});

productRouter.put('/:id/:typeOrder', async (req: Request, res: Response) => {
  const { id, typeOrder } = req.params;
  const product: ProductBase = {
    name: id,
    price: 0,
    quantity: 0,
  };
  await productRule.updateStock(product, typeOrder);
});

export default productRouter;
