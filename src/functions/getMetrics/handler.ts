import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getDynamoData } from "src/dynamoDb/getData";

const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const id = event?.queryStringParameters?.id ?? "ID";
  const from =
    event?.queryStringParameters?.from ??
    new Date().getTime() - 1000 * 60 * 60 * 24 * 5;
  const to = event?.queryStringParameters?.to ?? new Date().getTime();

  const data = await getDynamoData(id, Number(from), Number(to));
  return formatJSONResponse({
    data,
  });
};

export const main = middyfy(handler);
