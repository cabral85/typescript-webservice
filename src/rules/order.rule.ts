import * as dotenv from 'dotenv';
const { v4: uuidv4 } = require('uuid');

import { Order, OrderBase } from '../models/order.interface';
import { dynamoDb } from '../utils/dynamoDbConnection';
import { getProductByName, updateStock } from './product.rule';

dotenv.config();

const TYPE_ORDER = 'decrease';

const TableName = process.env.ORDER_TABLE_NAME;

const getOrders = async () => {
  const params = {
    TableName,
  };

  const dynamoResult = await dynamoDb.scan(params).promise();
  return dynamoResult.Items as Order[];
};

const getOrderById = async (orderId: number) => {
  const params = {
    TableName,
    Key: {
      orderId,
    },
  };

  const dynamoResult = await dynamoDb.get(params).promise();
  return dynamoResult.Item as Order;
};

const saveOrder = async (order: OrderBase): Promise<OrderBase | Error> => {
  const orderId = uuidv4();
  let total = 0;

  for (const product of order.products) {
    const productItem = await getProductByName(product.name);
    if (productItem.quantity >= product.quantity) {
      const productPrice = productItem.price * product.quantity;
      total = total + productPrice;
    } else {
      return new Error(`Invalid qtt to ${productItem.name}`);
    }
  }

  order.products.forEach(
    async (product) => await updateStock(product, TYPE_ORDER)
  );

  const params = {
    TableName,
    Item: {
      orderId,
      products: order.products,
      total,
    },
  };

  await dynamoDb.put(params).promise();

  return getOrderById(orderId);
};

export { getOrders, getOrderById, saveOrder };
