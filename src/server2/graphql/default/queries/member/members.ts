import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { Adherent } from "../../types/members/Adherent";

type args = {  }

export default {
    type: new GraphQLList(Adherent),
    args: {

    },
    resolve: async (source, args, context) => {
        return dbcontext.models.adherents.findAll();
    }
} as GraphQLFieldConfig<any, any, args>