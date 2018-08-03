import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { Op } from "sequelize"
import { Adherent } from "./../../types/members/Adherent";
import { AdherentInput } from "./../../types/members/AdherentInput";
import * as Boom from "boom";
import { Adhesion } from "../../types/members/Adhesion";
import { AdhesionInput } from "../../types/members/AdhesionInput";
import { AdhesionType } from "../../../../database/entities/members/adhesion";
import { ActSessionType } from "../../../../database/entities/admin/activite_session";
import { Facture } from "../../types/comptabilite/Facture";
import { FactureInput } from "../../types/comptabilite/FactureInput";
import { FactureDetailType } from "../../../../database/entities/comptabilite/facture_detail";
import { asyncForEach } from "../../../../utils/array";

type args = {
    facture_id: number
    adhesions_ids: number[]
}

export default {
    type: Facture,
    args: {
        facture_id: { type: new GraphQLNonNull(GraphQLInt) },
        adhesions_ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
    },
    resolve: async (source, args, context) => {

        // -- get facture
        let _facture = await dbcontext.models.Factures.find({ where: { id: args.facture_id } });

        // -- get adhesions
        let _adhesions = await dbcontext.models.adhesions.findAll({ where: { id: { [Op.or]: args.adhesions_ids } } });

        // -- attribution
        await _facture.setAdhesions(_adhesions);

        return _facture;
    }
} as GraphQLFieldConfig<any, any, args>