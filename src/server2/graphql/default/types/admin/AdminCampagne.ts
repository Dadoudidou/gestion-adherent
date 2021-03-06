import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean } from "graphql"
import { TarifLicenceType } from "@server/database/entities/admin/tarif_licence";
import { ScalarDate } from "@server/graphql/default/types/Date";
import { AdminActiviteCategorie } from "./AdminActiviteCategorie";
import { SaisonType } from "../../../../database/entities/admin/saison";


export const AdminCampagne = new GraphQLObjectType({
    name: "AdminCampagne",
    fields: () => ({
        id: { type: GraphQLInt },
        debut: { type: ScalarDate },
        fin: { type: ScalarDate },
        nom: { type: GraphQLString },
        activites: {
            type: new GraphQLList(AdminActiviteCategorie),
            resolve: (source) => {
                return source.getCategories();
            }
        }
    })
} as GraphQLObjectTypeConfig<SaisonType, any>)
