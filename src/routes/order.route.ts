import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Order } from '../models/order.interface';
import { orderRule } from '../rules/index';

// eslint-disable-next-line new-cap
export const orderRouter = express.Router();

orderRouter.get('/', async (req: Request, res: Response) => {
  const result = await orderRule.getOrders();
  if (result) {
    res.status(StatusCodes.OK).send(result);
  } else {
    res.status(StatusCodes.NOT_FOUND);
  }
});

orderRouter.get('/:id', async (req: Request, res: Response) => {
  const inputData: Order = req.body;
  const result = await orderRule.getOrderById(inputData.id);
  if (result) {
    res.status(StatusCodes.OK).send(result);
  } else {
    res.status(StatusCodes.NOT_FOUND);
  }
});

orderRouter.post('/', async (req: Request, res: Response) => {
  try {
    const inputData: Order = req.body;
    const result = await orderRule.saveOrder(inputData);
    res.status(StatusCodes.CREATED).send(result);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST);
  }
});

export default orderRouter;
