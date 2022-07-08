import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "metrics",
      },
    },
  ],
  environment: {
    DYNAMO_TABLE: "${self:custom.DYNAMO_TABLE}",
  },
};
