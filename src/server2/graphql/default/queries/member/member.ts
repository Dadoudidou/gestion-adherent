import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { Adherent } from "../../types/members/Adherent";

type args = {  
    id: number
}

export default {
    type: Adherent,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (source, args, context) => {
        return dbcontext.models.adherents.find({
            where: {
                id: args.id
            }
        });
    }
} as GraphQLFieldConfig<any, any, args>