import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { DocumentType } from "@server/database/entities/members/document"
import { ScalarDate } from "@server/graphql/default/types/Date";

export const AdherentDocument = new GraphQLObjectType({
    name: "AdherentDocument",
    fields: () => ({
        id: { type: GraphQLInt },
        valide: { type: GraphQLBoolean },
        type: { type: GraphQLString },
        date_creation: { type: ScalarDate },
        libelle: { type: GraphQLString },
        document: { type: GraphQLString },
        validite: { type: GraphQLString },
    })
} as GraphQLObjectTypeConfig<DocumentType, any>)
