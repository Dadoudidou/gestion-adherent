import { GQLField } from "@server/graphql/V1";
import { GQLCampagne } from "@server/graphql/V1/types/objects/campagne";
import { GraphQLNonNull, GraphQLInt, GraphQLString } from "graphql";
import { composeResolver, traceResolver, isAuthenticatedResolver } from "@server/graphql/_ResolverMiddleware";
import { login, getUserInfos } from "@server/utils/auth";
import * as Boom  from "boom";
import { GQLUser } from "@server/graphql/V1/types/objects/user";


type args = {
    token: string
}

export default {
    type: GQLUser,
    args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (root, args, ctx) => {
        let _login = await getUserInfos(args.token);
        return _login.user;
    }
} as GQLField<args>

