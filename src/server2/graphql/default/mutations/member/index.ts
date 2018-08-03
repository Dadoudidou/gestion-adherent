import { GraphQLObjectType } from "graphql";

import saveMember from "./saveMember";
import saveAdhesion from "./saveAdhesion";

export const MutationMember =  new GraphQLObjectType({
    name: "MutationMember",
    fields: {
        saveMember,
        saveAdhesion
    }
})