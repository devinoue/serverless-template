export const dynamoDbTable = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S",
      },
      {
        AttributeName: "unixTime",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
      {
        AttributeName: "unixTime",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: "5",
      WriteCapacityUnits: "5",
    },
    TableName: "${self:custom.DYNAMO_TABLE}",
  },
};
