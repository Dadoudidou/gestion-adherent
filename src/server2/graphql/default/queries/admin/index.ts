import { GraphQLObjectType } from "graphql";

import sections from "./sections"
import campagne from "./campagne"

export const QueryAdmin =  new GraphQLObjectType({
    name: "QueryAdmin",
    fields: {
        sections,
        campagne
    }
})