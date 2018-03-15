import { GraphQLSchema, schemaResolver } from "../utils/GraphQLSchema";
import { SaisonType } from "./../../../../datas/entities/admin/saison";
import { dbcontext } from "./../../../../datas"
import { args_searchString } from "../utils/ArgsUtils";

export class graphql_saison extends GraphQLSchema<SaisonType> {
    Type = {
        defs: `
        type Saison {
            id: Int
            debut: Date
            fin: Date
            nom: String
            categories(id: Int, nom: String): [ActCategorie]
        }
        `,
        resolvers: {
            Saison: {
                categories: (root: SaisonType, args) => {
                    let _args = args_searchString(args, "nom");
                    return root.getCategories({ where: _args })
                }
            }
        }
    }
    Query= {
        name:"saisons",
        defs: `
            saisons: [Saison]
        `,
        resolvers: {
            saisons: () => {
                return dbcontext.models.saisons.findAll();
            }
        }
    }
}