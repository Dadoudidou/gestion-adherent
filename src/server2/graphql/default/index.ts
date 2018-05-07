import { printSchema } from "graphql";
import { schema } from "./rootSchema"

export const getSchema = () => {
    return schema;
}

export const getStringShema = () => {
    return printSchema(schema);
}