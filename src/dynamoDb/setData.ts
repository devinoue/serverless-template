// let aws = require('aws-sdk')
import { DynamoDB } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient({ region: "ap-northeast-1" });
export const setDynamoData = async function (id: string, options: object) {
  let item = {
    id,
    unixTime: new Date().getTime(),
    expiredAt: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 75, // 75日ぐらい保持
    ...options,
  };

  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Item: item,
  };
  const res = await dynamoDB
    .put(params)
    .promise()
    .catch((e) => {
      console.log(e);
      return { message: e };
    });
  return res;
};
