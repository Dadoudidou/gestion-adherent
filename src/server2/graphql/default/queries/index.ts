import { GraphQLObjectType } from "graphql";

import { QuerySystem } from "./system";
import { QueryAdmin } from "./admin"
import { QueryMember } from "./member";
import { QueryComptabilite } from "./comptabilite";

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
        },
        member: {
            type: QueryMember,
            resolve: () => "QueryMember"
        },
        comptabilite: {
            type: QueryComptabilite,
            resolve: () => "QueryComptabilite"
        }
    }
})
