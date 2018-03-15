import { GraphQLSchema } from "../utils/GraphQLSchema";
import { dbcontext } from "./../../../../datas"
import { ActCategorieType } from "./../../../../datas/entities/admin/activite_categorie";
import { args_searchString } from "../utils/ArgsUtils";

export class graphql_actCategorie extends GraphQLSchema<ActCategorieType> {
    Type = {
        defs: `
        type ActCategorie {
            id: Int
            nom: String
            activites(id: Int, nom: String): [ActActivite]
            saison: Saison
        }
        `,
        resolvers: {
            ActCategorie: {
                activites: (root: ActCategorieType, args) => {
                    let _args = args_searchString(args, "nom");
                    return root.getActivites({ where: _args })
                },
                saison: (root: ActCategorieType, args) => {
                    return root.getSaison();
                }
            }
        }
    }

    Query= {
        name:"actCategories",
        defs: `
            categories(id: Int, nom: String): [ActCategorie]
        `,
        resolvers: {
            categories: (root, args) => {
                let _args = args_searchString(args, "nom");
                return dbcontext.models.actCategories.findAll({ where: _args });
            }
        }
    }

}