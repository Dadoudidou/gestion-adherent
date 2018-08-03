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
    facture: APIObjects.Facture
}

export default {
    type: Facture,
    args: {
        facture: { type: new GraphQLNonNull(FactureInput) }
    },
    resolve: async (source, args, context) => {

        // -- tiers
        if(!args.facture.tiers) throw Boom.badRequest("Tiers est manquant dans Facture");
        let _tiers = await dbcontext.models.Tiers.find({where:{id:args.facture.tiers.id}});
        if(!_tiers) throw Boom.badRequest(`Tiers (${args.facture.tiers.id}) non trouvé`);
        
        if(!args.facture.id){

            return dbcontext.models.Factures.create({
                date_creation: new Date(),
                comptabilite_tiers_id: _tiers.id
            })
            .then(async NewFacture => {
                // -- enregistrements details
                if(args.facture.details){
                    await args.facture.details.forEach(async detail => {
                        await NewFacture.createDetail({
                            libelle:detail.libelle,
                            montant: detail.montant,
                            description: detail.description,
                            ordre: detail.ordre
                        })
                    })
                }
                // -- enregistrement paiements
                if(args.facture.paiements){
                    await args.facture.paiements.forEach(async paiement => {
                        await NewFacture.createPaiement({
                            banque: paiement.banque,
                            date_banque: paiement.date_banque,
                            montant: paiement.montant,
                            reference: paiement.reference,
                            type: paiement.type,
                            valide: false
                        } as any)
                    })
                }
                return NewFacture;
            })            

        } else {

            let _facture = await dbcontext.models.Factures.find({where:{id:args.facture.id}});
            if(!_facture) throw Boom.badRequest(`Facture ${args.facture.id} non trouvée`);

            // -- changement tiers
            await _facture.setTiers(_tiers);
            
            // -- changement details
            if(!args.facture.details) args.facture.details = [];
            let _factureDetails = await _facture.getDetails();
            let _detailsToDelete = _factureDetails.filter(detail => !args.facture.details.find(x => x.id == detail.id));
            let _detailsToUpdate = _factureDetails.filter(detail => args.facture.details.find(x => x.id == detail.id));
            let _detailsToAdd = args.facture.details.filter(detail => !detail.id);
            if(_detailsToDelete.length > 0){
                await dbcontext.models.FactureDetails.destroy({ where: { id: { [Op.or]: _detailsToDelete.map(x => x.id) } } });
            }
            await asyncForEach(_detailsToUpdate, async detail => {
                let _detail = args.facture.details.find(x => x.id == detail.id);
                for(let key in _detail){ detail[key] = _detail[key]; }
                await detail.save();
            })
            await asyncForEach(_detailsToAdd, async detail => {
                await _facture.createDetail({
                    libelle:detail.libelle,
                    montant: detail.montant,
                    description: detail.description,
                    ordre: detail.ordre
                })
            })

            // -- changement paiements
            if(!args.facture.paiements) args.facture.paiements = [];
            let _facturePaiements = await _facture.getPaiements();
            let _paiementsToDelete = _facturePaiements.filter(item => !args.facture.paiements.find(x => x.id == item.id));
            let _paiementsToUpdate = _facturePaiements.filter(item => args.facture.paiements.find(x => x.id == item.id));
            let _paiementsToAdd = args.facture.paiements.filter(item => !item.id);
            if(_paiementsToDelete.length > 0){
                await dbcontext.models.FacturePaiements.destroy({ where: { id: { [Op.or]: _paiementsToDelete.map(x => x.id) } } });
            }
            await asyncForEach(_paiementsToUpdate, async item => {
                let _item = args.facture.paiements.find(x => x.id == item.id);
                for(let key in _item){ item[key] = _item[key]; }
                await item.save();
            });
            await asyncForEach(_paiementsToAdd, async item => {
                await _facture.createPaiement({
                    banque: item.banque,
                    date_banque: item.date_banque,
                    montant: item.montant,
                    reference: item.reference,
                    type: item.type,
                    valide: false
                })
            });

            return _facture;
        }
    }
} as GraphQLFieldConfig<any, any, args>