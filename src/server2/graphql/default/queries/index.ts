import { GraphQLObjectType } from "graphql";

import { QuerySystem } from "./system";
import { QueryAdmin } from "./admin"

export const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        system: { 
            type: QuerySystem,
            resolve: (source, args, context) => { return "QuerySystem"; }
        },
        admin: {
            type: QueryAdmin,
            resolve: () => "QueryAdmin"
        }
    }
})
