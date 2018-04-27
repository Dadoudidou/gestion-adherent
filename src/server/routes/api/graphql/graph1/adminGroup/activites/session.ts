import { GraphqlObject } from "../../../utils/GraphQLSchema/graphqlObject";

import { args_searchString, args_replaceVar } from "./../../../utils/ArgsUtils"

import { dbcontext } from "./../../../../../../datas";
import { ActSessionType } from "./../../../../../../datas/entities/admin/activite_session";

export class Session extends GraphqlObject {
    name = "Session";
    attributes = {
        id: "Int",
        jour: "Int",
        heure_debut: "String",
        heure_fin: "String",
        place: "Int",
        section: {
            type: "Section",
            resolver: (root: ActSessionType, args) => {
                return root.getSection();
            }
        },
        lieu: {
            type: "Lieu",
            resolver: (root: ActSessionType) => {
                return root.getLieu();
            }
        }
    };

    mutationAttributes={
        addSession: {
            type: "Session",
            args: { session: "_Session!" },
            resolver: async (root, args, context) => {
                let section = await dbcontext.models.actSections.find({ where: { id: args.session.section_id } });
                if(!section) throw new Error(`Not found section with id ${args.session.section_id}`);
                let lieu = await dbcontext.models.lieux.find({ where: { id: args.session.lieu_id } });
                if(!lieu) throw new Error(`Not found lieu with id ${args.session.lieu_id}`);
                args.session = args_replaceVar(args.session, "section_id", "admin_activite_section_id");
                args.session = args_replaceVar(args.session, "lieu_id", "admin_lieu_id");
                return dbcontext.models.actSessions.create(args.session);
            }
        },
        deleteSession: {
            type: "Boolean",
            args: { id: "Int!" },
            resolver: async (root, args, context) => {
                let entity = await dbcontext.models.actSessions.find({ where: { id: args.id } });
                if(!entity) return true;
                await entity.destroy();
                return true;
            }
        },
        updateSession: {
            type: "Session",
            args: { id: "Int!", session: "_Session!" },
            resolver: async (root, args, context) => {
                let entity = await dbcontext.models.actSessions.find({ where: { id: args.id } });
                if(!entity) throw new Error(`Not found session with id ${args.id}`);
                
                for(let key in args.session){ entity[key] = args.session[key]; }
                entity = await entity.save();
                return entity;
            }
        }
    }
}

export class InputSession  extends GraphqlObject
{
    type = "input"
    name="_Session";
    attributes = {
        jour: "Int",
        heure_debut: "String",
        heure_fin: "String",
        place: "Int",
        section_id: "Int!",
        lieu_id: "Int!"
    }
}