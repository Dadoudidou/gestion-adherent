import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { Op } from "sequelize"
import { dbcontext } from "@server/database";
import { Facture } from "../../types/comptabilite/Facture";
import { descriptionTarif, dureeTarif } from "@shared/Components/Utils/Tarifs";
import * as moment from "moment"
import { AdhesionInput } from "../../types/members/AdhesionInput";
import { Entity_ActActivite } from "@server/database/entities/admin/activite_activite";


type args = {  
    id?: number
    adhesions?: APIObjects.Adherent_Adhesion[]
}

export default {
    type: Facture,
    args: {
        id: { type: GraphQLInt },
        adhesions: { type: new GraphQLList(AdhesionInput) }
    },
    resolve: async (source, args, context) => {
        // -- si id est fourni, on retourne la facture avec l'id
        // -- si adhérents est fourni, on retourne une génération de facture temporaire
        if(args.id){
            return dbcontext.models.Factures.find({ where: { id: args.id } })
        }
        if(args.adhesions){

            let _facture: APIObjects.Facture = {
                details: [],
                paiements:[]
            }

            
            //#region requetage tarifs - section - sessions

            let _tarifsIds =  args.adhesions.map(x => x.tarif.id);
            var _tarifs: APIObjects.Tarif[] = await dbcontext.models.tarifs.findAll({
                where: { id: { [Op.or]: _tarifsIds } },
                include: [{
                    model: dbcontext.models.actSections, as: "section", required: true,
                    include: [
                        { 
                            model: dbcontext.models.actActivites, as: "activite", required: true, 
                            include: [{
                                model: dbcontext.models.actCategories, as: "categorie", required: true,
                                include: [{
                                    model: dbcontext.models.saisons, as: "saison", required: true
                                }]
                            }]
                        },
                        {
                            model: dbcontext.models.actSessions, as: "sessions", required: true, 
                            include: [{
                                model: dbcontext.models.lieux, as: "lieu", required: true
                            }]
                        }
                    ]
                }]
            });

            //#endregion


            //#region - requetage regroupement adherents - adhesions
            let _adherents: APIObjects.Adherent[] = await dbcontext.models.adherents.findAll({
                where: { id: { [Op.or]: args.adhesions.map(x => x.adherent.id) } },
                include: [{
                    model: dbcontext.models.adhesions, as:"adhesions", required: true,
                    include: [{
                        model: dbcontext.models.actSections, as: "section", required: true,
                        include: [{
                            model: dbcontext.models.actActivites, as: "activite", required: true, 
                            include: [{
                                model: dbcontext.models.actCategories, as: "categorie", required: true,
                                include: [{
                                    model: dbcontext.models.saisons, as: "saison", required: true,
                                    where: { id: { [Op.or]: _tarifs.map(x => x.section.activite.categorie["saison"].id) } }
                                }]
                            }]
                        }]
                    }]
                }]
            });
            args.adhesions.forEach(adhesion => {
                let _index = -1;
                if(adhesion.adherent.id) _index = _adherents.map(x => x.id).indexOf(adhesion.adherent.id);
                else _index = _adherents.map(x => `${x.nom}_${x.prenom}`).indexOf(`${adhesion.adherent.nom}_${adhesion.adherent.prenom}`);

                if(_index == -1){
                    _adherents.push({
                        ...adhesion.adherent,
                        adhesions: [
                            adhesion
                        ]
                    })
                } else {
                    _adherents[_index].adhesions.push(adhesion);
                }
            })
            //#endregion



            //#region generation detail -- adhesions à des activités
            let _ordre = 1;
            args.adhesions.forEach(adhesion => {

                // -- recherche tarif
                let _index = _tarifs.map(x => x.id).indexOf(adhesion.tarif.id);
                if(_index == -1) throw "Un tarif d'adhésion est introuvable";
                let _tarif: APIObjects.Tarif = _tarifs[_index];
                let _section = _tarif.section;
                
                // -- description tarif
                let _description = ''
                _description += `${_section.activite.categorie.nom} / ${_section.activite.nom} \n`;
                _description += `${descriptionTarif(_tarif)} - ${dureeTarif(_tarif)}\n`;

                // -- description session
                let _sessions = adhesion.sessions;
                if(!_tarif.nbsessionmin || !_tarif.nbsessionmax){
                    _sessions = _tarif.section.sessions;
                } else if(adhesion.sessions) {
                    _sessions = _tarif.section.sessions.filter(x => adhesion.sessions.map(y => y.id).indexOf(x.id) > -1);
                }
                if(_sessions){
                    _sessions.concat().sort((a,b) => {
                        if(a.jour < b.jour) return -1;
                        if(a.jour > b.jour) return 1;
                        return 0;
                    }).forEach(session => {
                        let _dateD = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_debut));
                        let _dateF = moment().day(session.jour).startOf("day").add(moment.duration(session.heure_fin));
                        _description += `${_dateD.format("dddd")} de ${_dateD.format("LT")} à ${_dateF.format("LT")} (${session.lieu.nom})\n`;
                    })
                }

                // -- ajout
                _facture.details.push({
                    ordre: _ordre,
                    libelle: `${adhesion.adherent.prenom} - ${_section.nom}`,
                    description: _description,
                    montant: _tarif.montant,
                })
                _ordre++;
            })

            //#endregion

            //#region generation detail -- adhesion ffn

            

            //#endregion

            //#region generation detail -- reduction deuxième activité

            /*_adherents.forEach(adherent => {
                if(adherent.adhesions.length > 1){
                    _facture.details.push({
                        montant: -15,
                        libelle: `${adherent.prenom} - Réduction 2ème activité`,
                        ordre: _ordre
                    })
                    _ordre++;
                }
            })*/

            //#endregion

            //#region generation detail -- boutique

            //#endregion

            return _facture;
        }
        return null;
    }
} as GraphQLFieldConfig<any, any, args>