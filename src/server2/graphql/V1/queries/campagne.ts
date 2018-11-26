import { GQLField } from "@server/graphql/V1";
import { GQLCampagne } from "@server/graphql/V1/types/objects/campagne";
import { GraphQLNonNull, GraphQLInt } from "graphql";
import { composeResolver, traceResolver, isAuthenticatedResolver } from "@server/graphql/_ResolverMiddleware";


type args = {
    id: number
}

export default {
    type: GQLCampagne,
    description: "Information d'une campagne",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: (root, args, ctx) => {
        return ctx.db.model("campagne").find({
            where: { id: args.id }
        })
    },
    
} as GQLField<args>

