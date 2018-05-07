import { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"

export type InputSystemUser = {
    login?: string
    pwd?: string
    nom?: string
    prenom?: string
}

export const InputSystemUser = new GraphQLInputObjectType({
    name: "InputSystemUser",
    fields: () => ({
        login: { type: GraphQLString },
        pwd: { type: GraphQLString },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString }
    })
})
