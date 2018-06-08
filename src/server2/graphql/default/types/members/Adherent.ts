import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { AdherentType } from "@server/database/entities/members/adherent"
import { AdhesionType } from "@server/database/entities/members/adhesion";
import { dbcontext } from "@server/database"
import * as deepExtend from "deep-extend"

import { Adhesion } from "./Adhesion";
import { AdherentDocument } from "./AdherentDocument";

import * as sequelize from "sequelize"

type adhesionsArguments = {
    section_id?: number
    activite_id?: number
    categorie_id?: number
    campagne_id?: number
}

export const Adherent = new GraphQLObjectType({
    name: "Adherent",
    fields: () => ({
        id: { type: GraphQLInt },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        datenaissance: { type: ScalarDate },
        male: { type: GraphQLBoolean },
        adresse: { type: GraphQLString },
        codepostal: { type: GraphQLString },
        ville: { type: GraphQLString },
        numero_licence: { type: GraphQLString },
        telephone_fixe: { type: GraphQLString },
        telephone_mobile: { type: GraphQLString },
        email: { type: GraphQLString },
        adhesions: {
            type: new  GraphQLList(Adhesion),
            args: {
                section_id: { type: GraphQLInt },
                activite_id: { type: GraphQLInt },
                categorie_id: { type: GraphQLInt },
                campagne_id: { type: GraphQLInt },
            },
            resolve: (root, args: adhesionsArguments, context) => {
                let _searchParameters: sequelize.FindOptions<AdhesionType> = { }
                if(args.section_id){
                    _searchParameters = deepExtend(_searchParameters, {
                        include: [{ 
                            model: dbcontext.models.actSections,
                            required: true,
                            as: 'section',
                            where: { id: args.section_id }
                        }]
                    })
                }
                if(args.activite_id){
                    _searchParameters = deepExtend(_searchParameters, {
                        include: [{ 
                            model: dbcontext.models.actSections,
                            as: 'section',
                            required: true,
                            include: [{
                                model: dbcontext.models.actActivites,
                                as: 'activite',
                                required: true,
                                where: { id: args.activite_id }
                            }]
                        }]
                    })
                }
                if(args.categorie_id){
                    _searchParameters = deepExtend(_searchParameters, {
                        include: [{ 
                            model: dbcontext.models.actSections,
                            as: 'section',
                            required: true,
                            include: [{
                                model: dbcontext.models.actActivites,
                                as: 'activite',
                                required: true,
                                include: [{
                                    model: dbcontext.models.actCategories,
                                    as: 'categorie',
                                    required: true,
                                    where: { id: args.categorie_id }
                                }]
                            }]
                        }]
                    })
                }
                if(args.campagne_id){
                    _searchParameters = deepExtend(_searchParameters, {
                        include: [{ 
                            model: dbcontext.models.actSections,
                            as: 'section',
                            required: true,
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
                        }]
                    })
                }
                return root.getAdhesions(_searchParameters);
            },
        },
        documents: {
            type: AdherentDocument,
            args: {},
            resolve: (root, args, context) => {
                return root.getDocuments();
            },
        }
    })
} as GraphQLObjectTypeConfig<AdherentType, any>)
