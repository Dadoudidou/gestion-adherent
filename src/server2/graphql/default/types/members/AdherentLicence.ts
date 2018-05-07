import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { AdherentLicenceType } from "@server/database/entities/members/licence"

export const AdherentLicence = new GraphQLObjectType({
    name: "AdherentLicence",
    fields: () => ({
        id: { type: GraphQLInt },
        tshirt: { type: GraphQLString },
        type: { type: GraphQLString },
        dernier_club: { type: GraphQLString },
    })
} as GraphQLObjectTypeConfig<AdherentLicenceType, any>)

