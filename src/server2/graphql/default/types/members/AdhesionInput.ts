import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull } from "graphql"
import { AdhesionType } from "@server/database/entities/members/adhesion"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { DocumentType } from "@server/database/entities/members/document";
import { Adherent } from "./Adherent";
import { AdminActiviteSection } from "../admin/AdminActiviteSection";
import { AdminTarif } from "../admin/AdminTarif";
import { AdminActiviteSession } from "../admin/AdminActiviteSession";
import { AdherentInput } from "./AdherentInput";
import { AdminActiviteSectionInput } from "../admin/AdminActiviteSectionInput";
import { AdminTarifInput } from "../admin/AdminTarifInput";
import { AdminActiviteSessionInput } from "../admin/AdminActiviteSessionInput";

export const AdhesionInput = new GraphQLInputObjectType({
    name: "AdhesionInput",
    fields: () => ({
        id: { type: GraphQLInt },
        valide: { type: GraphQLBoolean },
        adherent: { type: new GraphQLNonNull(AdherentInput) },
        //section: { type: AdminActiviteSectionInput },
        tarif: { type:  new GraphQLNonNull(AdminTarifInput) },
        sessions: { type: new GraphQLList(AdminActiviteSessionInput), }
    })
})
