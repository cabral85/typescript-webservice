import * as dotenv from 'dotenv';

import { ProductBase } from '../models/product.interface';
import { dynamoDb } from '../utils/dynamoDbConnection';

dotenv.config();

const TableName = process.env.PRODUCT_TABLE_NAME;

const getProducts = async (): Promise<ProductBase[]> => {
  try {
    const params = {
      TableName,
    };

    const dynamoResult = await dynamoDb.scan(params).promise();
    return dynamoResult.Items as ProductBase[];
  } catch (err) {
    throw err;
  }
};

const getProductByName = async (name: string) => {
  const params = {
    TableName,
    Key: {
      name,
    },
  };

  const dynamoResult = await dynamoDb.get(params).promise();
  return dynamoResult.Item as ProductBase;
};

const saveProduct = async (product: ProductBase) => {
  const params = {
    TableName,
    Item: product,
  };

  await dynamoDb.put(params).promise();
};

const updateStock = async (product: ProductBase, typeOrder: string) => {
  const productItem = await getProductByName(product.name);
  if (typeOrder === 'increase') {
    productItem.quantity += product.quantity;
  } else if (typeOrder === 'decrease') {
    productItem.quantity -= product.quantity;
  }

  const params = {
    TableName,
    Key: {
      name: productItem.name,
    },
    UpdateExpression: 'set quantity = :q',
    ExpressionAttributeValues: {
      ':q': productItem.quantity,
    },
  };

  await dynamoDb.update(params).promise();
};

export {
  getProducts,
  getProductByName,
  saveProduct,
  updateStock,
};
