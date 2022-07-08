import { DynamoDB } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient({ region: "ap-northeast-1" });

export const getDynamoData = async (id: string, from: number, to: number) => {
  let params = {
    TableName: process.env.DYNAMO_TABLE,
    KeyConditionExpression: "#id=:str AND unixTime between :from and :to",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":str": id,
      ":from": from,
      ":to": to,
    },
  };
  const res = await dynamoDB.query(params).promise();

  return res.Items;
};
