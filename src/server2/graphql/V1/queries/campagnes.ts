import { GQLField } from "@server/graphql/V1";
import { GQLCampagne } from "@server/graphql/V1/types/objects/campagne";
import { GraphQLNonNull, GraphQLInt, GraphQLList } from "graphql";

type args = {
}

export default {
    type: new GraphQLList(GQLCampagne),
    args: {
    },
    resolve: (root, args, ctx) => {
        return ctx.db.model("campagne").findAll();
    }
} as GQLField<args>