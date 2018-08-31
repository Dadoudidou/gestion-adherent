import { GQLField } from "@server/graphql/V1";
import { GraphQLBoolean } from "graphql";
import { GraphQLUpload } from "apollo-upload-server"

export default {
    type: GraphQLBoolean,
    description: "Import de fichier adhérent",
    args: {
        file: { type: GraphQLUpload }
    },
    resolve: async (parent, args, context) => {
        console.log(args.file);
        return true;
    }
} as GQLField