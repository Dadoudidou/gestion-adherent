import { GraphQLSchema } from "../utils/GraphQLSchema";
import { dbcontext } from "./../../../../datas"


import { args_searchString } from "../utils/ArgsUtils";
import { LieuType } from "./../../../../datas/entities/admin/lieu";


export class graphql_Lieu extends GraphQLSchema<LieuType> {
    Type = {
        defs: `
        type Lieu {
            id: Int
            nom: String
            adresse: String
            codepostal: String
            ville: String
            sessions(jour: Int): [ActSession]
        }
        `,
        resolvers: {
            Lieu: {
                sessions: (root: LieuType, args) => {
                    return root.getSessions({ where: args })
                }
            }
        }
    }

    Query= {
        name:"Lieux",
        defs: `
            lieux(id: Int, nom: String, ville: String): [Lieu]
        `,
        resolvers: {
            lieux: (root, args) => {
                let _args = args_searchString(args, "nom");
                _args = args_searchString(_args, "ville");
                return dbcontext.models.lieux.findAll({ where: _args });
            }
        }
    }

}