import { GraphQLSchema } from "../utils/GraphQLSchema";

export class graphql_json extends GraphQLSchema<any> {
    Type = {
        defs: `
        scalar JSON
        `,
        resolvers: {
            JSON: {
                __parseValue(value){
                    return JSON.stringify(value);
                },
                __serialize(value: any){
                    return JSON.parse(value);
                },
                __parseLiteral(ast){
                    return null;
                }
            }
        }
    }
}