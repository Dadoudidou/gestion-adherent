import { GQLField } from "@server/graphql/V1";
import { GQLCampagne } from "@server/graphql/V1/types/objects/campagne";
import { GraphQLNonNull, GraphQLInt, GraphQLList } from "graphql";

type args = {
}

export default {
    type: new GraphQLList(GQLCampagne),
    description: "Informations sur plusieurs campagnes",
    args: {
    },
    resolve: (root, args, ctx) => {
        console.log("call campagnes")
        return ctx.db.model("campagne").findAll();
    },
    //permissions: [1,2,3,4,5,6]
} as GQLField<args>