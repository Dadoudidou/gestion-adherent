import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql"
import { dbcontext } from "@server/database";
import { SystemGroup } from "./../../types/system/SystemGroup";

type args = {
    nom: string
}

export default {
    type: SystemGroup,
    args: {
        nom: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (source, args, context) => {
        return dbcontext.models.groups.create({
            nom: args.nom
        });
    }
} as GraphQLFieldConfig<any, any, args>