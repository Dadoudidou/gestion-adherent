import { GraphQLObjectType } from "graphql";

import { QuerySystem } from "./system";

export const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        system: { 
            type: QuerySystem,
            resolve: (source, args, context) => { return "QuerySystem"; }
        }
    }
})