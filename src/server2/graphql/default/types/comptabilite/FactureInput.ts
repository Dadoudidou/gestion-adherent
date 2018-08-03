import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectTypeConfig, GraphQLFloat, GraphQLBoolean, GraphQLInputObjectType } from "graphql"
import { ScalarDate } from "@server/graphql/default/types/Date";
import { AdherentType } from "@server/database/entities/members/adherent"
import { AdhesionType } from "@server/database/entities/members/adhesion";
import { dbcontext } from "@server/database"
import * as deepExtend from "deep-extend"

import * as sequelize from "sequelize"
import { TiersType } from "@server/database/entities/comptabilite/tiers";
import { Tiers } from "./Tiers";
import { FactureType } from "../../../../database/entities/comptabilite/facture";
import { FactureDetail } from "./FactureDetail";
import { FacturePaiement } from "./FacturePaiement";
import { TiersInput } from "./TiersInput";
import { FactureDetailInput } from "./FactureDetailInput";
import { FacturePaiementInput } from "./FacturePaiementInput";


export const FactureInput = new GraphQLInputObjectType({
    name: "FactureInput",
    fields: () => ({
        id: { type: GraphQLInt },
        tiers: { type: TiersInput },
        details: { type: new GraphQLList(FactureDetailInput) },
        paiements: { type: new GraphQLList(FacturePaiementInput) }
    })
})
