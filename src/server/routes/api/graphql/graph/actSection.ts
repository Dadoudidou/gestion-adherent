import { GraphQLSchema } from "../utils/GraphQLSchema";
import { dbcontext } from "datas"

import { ActSectionType } from "datas/entities/admin/activite_section";
import { args_searchString } from "../utils/ArgsUtils";

export class graphql_actSection extends GraphQLSchema<ActSectionType> {
    Type = {
        defs: `
        type ActSection {
            id: Int
            nom: String
            sessions(jour: Int): [ActSession]
            activite: ActActivite
        }
        `,
        resolvers: {
            ActSection: {
                sessions: (root: ActSectionType, args) => {
                    return root.getSessions({ where: args })
                },
                activite: (root: ActSectionType) => {
                    return root.getActivite()
                }
            }
        }
    }

    Query= {
        name:"actSections",
        defs: `
            sections(id: Int, nom: String): [ActSection]
        `,
        resolvers: {
            sections: (root, args) => {
                let _args = args_searchString(args, "nom");
                return dbcontext.models.actSections.findAll({ where: _args });
            }
        }
    }
}