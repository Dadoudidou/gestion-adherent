import { GraphQLSchema } from "../utils/GraphQLSchema";

export class graphql_date extends GraphQLSchema<any> {
    Type = {
        defs: `
        scalar Date
        `,
        resolvers: {
            Date: {
                __parseValue(value){
                    return new Date(value);
                },
                __serialize(value: Date){
                    return value.toISOString();
                },
                __parseLiteral(ast){
                    return null;
                }
            }
        }
    }
}