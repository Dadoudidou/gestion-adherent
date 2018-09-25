import { GQLField } from "@server/graphql/V1";
import { GQLCampagne } from "@server/graphql/V1/types/objects/campagne";
import { GraphQLNonNull, GraphQLInt, GraphQLString } from "graphql";
import { composeResolver, traceResolver, isAuthenticatedResolver } from "@server/graphql/_ResolverMiddleware";
import { login } from "@server/utils/auth";
import * as Boom  from "boom";


type args = {
    username: string
    password: string
}

export default {
    type: GraphQLString,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (root, args, ctx) => {
        let _login = await login(args.username, args.password)
        .catch(err => { throw Boom.unauthorized() });
        return _login.token;
    }
} as GQLField<args>

