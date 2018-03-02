import { GraphQLSchema } from "../utils/GraphQLSchema";
import { dbcontext } from "datas"

import { ActSessionType } from "datas/entities/admin/activite_session";

export class graphql_actSession extends GraphQLSchema<ActSessionType> {
    Type = {
        defs: `
        type ActSession {
            id: Int
            jour: Int
            heure_debut: String
            heure_fin: String
            place: Int
            section: ActSection
            lieu: Lieu
        }
        `,
        resolvers: {
            ActSession: {
                section: (root: ActSessionType, args) => {
                    return root.getSection()
                },
                lieu: (root: ActSessionType) => {
                    return root.getLieu()
                }
            }
        }
    }
}
