import { GraphQLObjectType } from "graphql";

import { MutationSystem } from "./system"

export const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        system: { 
            type: MutationSystem, 
            resolve: (source, args, context) => { return "MutationSystem"; } 
        }
    }
})