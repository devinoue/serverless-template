import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { setDynamoData } from "src/dynamoDb/setData";

const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // 何らかのロジック実装してデータ取得しまとめる
  const options = {
    test: "test",
  };
  await setDynamoData("ID", options);
  return formatJSONResponse({
    message: "success",
  });
};

export const main = middyfy(handler);
