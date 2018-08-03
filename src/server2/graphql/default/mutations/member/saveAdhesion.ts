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

type args = {
    adhesion: APIObjects.Adherent_Adhesion
}

export default {
    type: Adhesion,
    args: {
        adhesion: { type: new GraphQLNonNull(AdhesionInput) }
    },
    resolve: async (source, args, context) => {
        const { adhesion } = args;

        // -- vérification adherent
        let _adherent = await dbcontext.models.adherents.find({ where: { id: adhesion.adherent.id }})
        if(!_adherent) throw Boom.badRequest("adherent non touvé");
        // -- vérification tarif
        let _tarif = await dbcontext.models.tarifs.find({ 
            where: { id: adhesion.tarif.id },
            include: [{ 
                model: dbcontext.models.actSections, as: "section", required: true, 
                include: [{ model: dbcontext.models.actSessions, as: "sessions", required: true }]
            }]
        })
        if(!_tarif) throw Boom.badRequest("tarif non touvé");

        if(!adhesion.id){
            // -- création facture
            return dbcontext.models.adhesions
                .create({
                    admin_tarif_id: _tarif.id,
                    adherent_adherent_id: _adherent.id,
                    admin_activite_section_id: _tarif["section"].id,
                    valide: false
                } as AdhesionType)
                .then(NewAdhesion => {
                    // -- création sessions
                    if(!adhesion.sessions) return NewAdhesion;
                    if(adhesion.sessions.length == 0) return NewAdhesion;
                    let _allSessionsSection = _tarif["section"]["sessions"] as ActSessionType[];
                    let _sessionsSection = adhesion.sessions.filter(session => {
                        if(_allSessionsSection.map(x => x.id).indexOf(session.id) > -1) return true;
                        return false;
                    })
                    return dbcontext.models.actSessions.findAll({ 
                        where: { id: { [Op.or]: _sessionsSection.map(x => x.id) }} 
                    }).then(sessions => {
                        NewAdhesion.setSessions(sessions);
                        return NewAdhesion;
                    })
                })
        } else {
            return dbcontext.models.adhesions.find({ where: { id: adhesion.id } })
                .then(bddAdhesion => {
                    if(!bddAdhesion) throw Boom.badRequest("adhesion non trouvé");
                    // -- mise à jour adhesion
                    bddAdhesion.admin_tarif_id = _tarif.id;
                    bddAdhesion.admin_activite_section_id = _tarif["section"].id;
                    bddAdhesion.adherent_adherent_id = _adherent.id;
                    return bddAdhesion.save();
                })
                .then(bddAdhesion => {
                    // -- mise à jour sessions
                    if(!adhesion.sessions) return bddAdhesion;
                    if(adhesion.sessions.length == 0) return bddAdhesion;
                    let _allSessionsSection = _tarif["section"]["sessions"] as ActSessionType[];
                    let _sessionsSection = adhesion.sessions.filter(session => {
                        if(_allSessionsSection.map(x => x.id).indexOf(session.id) > -1) return true;
                        return false;
                    })
                    return dbcontext.models.actSessions.findAll({ 
                        where: { id: { [Op.or]: _sessionsSection.map(x => x.id) }} 
                    }).then(async sessions => {
                        await bddAdhesion.setSessions(sessions);
                        return bddAdhesion;
                    })
                })
        }
        
    }
} as GraphQLFieldConfig<any, any, args>