import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import * as deepExtend from "deep-extend"
import { AdminActiviteSection } from "../../types/admin/AdminActiviteSection";
import { AdminCampagne } from "../../types/admin/AdminCampagne";
import { ActSectionType } from "@server/database/entities/admin/activite_section";

import * as sequelize from "sequelize"

type args = {  
    campagne_id?: number
}

export default {
    type: new GraphQLList(AdminActiviteSection),
    args: {
        campagne_id: { type: GraphQLInt }
    },
    resolve: async (source, args, context) => {
        let _searchParameters: sequelize.FindOptions<ActSectionType> = { }
        if(args.campagne_id){
            _searchParameters = deepExtend(_searchParameters, {
                include: [{
                    model: dbcontext.models.actActivites,
                    as: 'activite',
                    required: true,
                    include: [{
                        model: dbcontext.models.actCategories,
                        as: 'categorie',
                        required: true,
                        where: { admin_saison_id: args.campagne_id }
                    }]
                }]
            })
        }
        return dbcontext.models.actSections.findAll(_searchParameters);
    }
} as GraphQLFieldConfig<any, any, args>