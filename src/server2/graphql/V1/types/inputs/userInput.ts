import { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig } from "graphql"

export type GQLUserInput = {
    login?: string
    pwd?: string
    nom?: string
    prenom?: string
}

export const GQLUserInput = new GraphQLInputObjectType({
    name: "UserInput",
    fields: () => ({
        login: { type: GraphQLString },
        pwd: { type: GraphQLString },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString }
    })
})