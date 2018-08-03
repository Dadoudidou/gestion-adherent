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
import { Tiers } from "../../types/comptabilite/Tiers";
import { TiersInput } from "../../types/comptabilite/TiersInput";

type args = {
    tiers: APIObjects.Tiers
}

export default {
    type: Tiers,
    args: {
        tiers: { type: new GraphQLNonNull(TiersInput) }
    },
    resolve: async (source, args, context) => {
        if(!args.tiers.id){
            let _tiers = await dbcontext.models.Tiers.create({
                adresse: args.tiers.adresse,
                codepostal: args.tiers.codepostal,
                email: args.tiers.email,
                nom: args.tiers.nom,
                prenom: args.tiers.prenom,
                telephone_fixe: args.tiers.telephone_fixe,
                telephone_mobile: args.tiers.telephone_mobile,
                ville: args.tiers.ville
            })
            return _tiers;
        } else {
            let _tiers = await dbcontext.models.Tiers.find({where:{id:args.tiers.id}});
            if(!_tiers) throw Boom.badRequest(`Tiers (${args.tiers.id}) non trouvé`);
            for(let key in args.tiers) { _tiers[key] = args.tiers[key]; }
            return _tiers.save();
        }
        
    }
} as GraphQLFieldConfig<any, any, args>