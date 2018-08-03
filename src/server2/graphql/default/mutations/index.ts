import { GraphQLObjectType } from "graphql";

import { MutationSystem } from "./system"
import { MutationMember } from "./member"
import { MutationComptabilite } from "./comptabilite"

export const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        system: { 
            type: MutationSystem, 
            resolve: (source, args, context) => { return "MutationSystem"; } 
        },
        member: { 
            type: MutationMember, 
            resolve: (source, args, context) => { return "MutationMember"; } 
        },
        comptabilite: { 
            type: MutationComptabilite, 
            resolve: (source, args, context) => { return "MutationComptabilite"; } 
        }
    }
})