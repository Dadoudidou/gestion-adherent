import { GraphQLFieldConfig, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql"
import { dbcontext } from "@server/database";
import { Adherent } from "./../../types/members/Adherent";
import { AdherentInput } from "./../../types/members/AdherentInput";
import * as Boom from "boom";

type args = {
    member: APIObjects.Adherent
}

export default {
    type: Adherent,
    args: {
        member: { type: new GraphQLNonNull(AdherentInput) }
    },
    resolve: async (source, args, context) => {
        const { member } = args;
        if(!member.id){
            return dbcontext.models.adherents
                .create(args.member)
                .then(member => { return member; });
        } else {
            return dbcontext.models.adherents
                .find({ where: { id: member.id } })
                .then(bddMember => {
                    if(!bddMember) throw Boom.badRequest("L'adhérent (id:"+member.id+") est introuvable.");
                    for(let key in args.member){ bddMember[key] = args.member[key]; }
                    return bddMember.save();
                })
        }
        
    }
} as GraphQLFieldConfig<any, any, args>