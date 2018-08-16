import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLBoolean } from "graphql"
import { GraphQLContext } from "@server/graphql/V1";
import { AdherentDocumentInstance } from "@server/database2/Models/adherentDocument";
import { GQLScalarDate } from "@server/graphql/V1/types/scalars/Date";



export const GQLAdherentDocument = new GraphQLObjectType({
    name: "AdherentDocument",
    fields: () => ({
        id: { type: GraphQLInt },
        valide: { type: GraphQLBoolean },
        type: { type: GraphQLString },
        date_creation: { type: GQLScalarDate },
        libelle: { type: GraphQLString },
        document: { type: GraphQLString },
        validite: { type: GraphQLString },
        
    })
} as GraphQLObjectTypeConfig<AdherentDocumentInstance, GraphQLContext>)

