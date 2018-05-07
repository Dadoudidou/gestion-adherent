import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { AdhesionType } from "@server/database/entities/members/adhesion"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { DocumentType } from "@server/database/entities/members/document";

export const Adhesion = new GraphQLObjectType({
    name: "Adhesion",
    fields: () => ({
        id: { type: GraphQLInt },
        valide: { type: GraphQLBoolean },
    })
} as GraphQLObjectTypeConfig<AdhesionType, any>)
