import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql"
import { dbcontext } from "@server/database";
import { Adherent } from "../../types/members/Adherent";
import * as sequelize from "sequelize";

type args = { 
    nom?: string
    limit?: number
 }

export default {
    type: new GraphQLList(Adherent),
    args: {
        nom: { type: GraphQLString },
        limit: { type: GraphQLInt }
    },
    resolve: async (source, args, context) => {
        let _where = {};
        if(args.nom) _where = {..._where, nom: { [sequelize.Op.like]: `%${args.nom}%` }}
        return dbcontext.models.adherents.findAll({
            where: _where,
            limit: args.limit
        });
    }
} as GraphQLFieldConfig<any, any, args>