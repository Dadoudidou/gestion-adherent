import { GraphQLSchema } from "../utils/GraphQLSchema";
import { dbcontext } from "datas"

import { ActActiviteType } from "datas/entities/admin/activite_activite";
import { args_searchString } from "../utils/ArgsUtils";

export class graphql_actActivite extends GraphQLSchema<ActActiviteType> {
    Type = {
        defs: `
        type ActActivite {
            id: Int
            nom: String
            sections(id: Int, nom: String): [ActSection]
            categorie: ActCategorie
        }
        `,
        resolvers: {
            ActActivite: {
                sections: (root: ActActiviteType, args) => {
                    let _args = args_searchString(args, "nom");
                    return root.getSections({ where: _args })
                },
                categorie: (root: ActActiviteType) => {
                    return root.getCategorie();
                }
            }
        }
    }

    Query= {
        name:"actActivites",
        defs: `
            activites(id: Int, nom: String): [ActActivite]
        `,
        resolvers: {
            activites: (root, args) => {
                let _args = args_searchString(args, "nom");
                return dbcontext.models.actActivites.findAll({ where: _args });
            }
        }
    }

}