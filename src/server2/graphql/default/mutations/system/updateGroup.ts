import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql"
import { dbcontext } from "@server/database";
import { SystemUser } from "./../../types/system/SystemUser";
import { InputSystemUser } from "./../../types/system/InputSystemUser";

type args = {
    id: number
    nom: string
}

export default {
    type: SystemUser,
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        nom: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (source, args, context) => {
        return dbcontext.models.groups.find({
            where: { id: args.id }
        }).then(group => {
            if(!group) throw new Error(`Not found group with id ${args.id}`)
            if(args.nom) group.nom = args.nom;
            return group.save();
        })
    }
} as GraphQLFieldConfig<any, any, args>