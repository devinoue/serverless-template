import type { AWS } from "@serverless/typescript";
import { dynamoDbTable } from "resources";
import getMetrics from "@functions/getMetrics";
import setMetrics from "@functions/getBatch";

const serverlessConfiguration: AWS = {
  service: "serverless-template",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],

  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-northeast-1",
    logRetentionInDays: 14,
    stage: '${opt:stage, "local"}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },

    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
              "dynamodb:DescribeStream",
              "dynamodb:GetRecords",
              "dynamodb:GetShardIterator",
              "dynamodb:ListStreams",
            ],
            Resource: [
              "arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.DYNAMO_TABLE}",
            ],
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      dynamoDbTable,
    },
  },
  // import the function via paths
  functions: { getMetrics, setMetrics },
  package: { individually: true },
  custom: {
    DYNAMO_TABLE:
      "${self:custom.otherfile.environment.${self:provider.stage}.DYNAMO_TABLE}",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },

    otherfile: {
      environment: {
        local: "${file(.env.yml)}",
        dev: "${file(.env.yml)}",
        prod: "${file(.env.yml)}",
      },
    },
  },
};

module.exports = serverlessConfiguration;
