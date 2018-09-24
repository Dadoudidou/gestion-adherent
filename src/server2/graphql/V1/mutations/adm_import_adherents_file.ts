import { GQLField } from "@server/graphql/V1";
import { GraphQLBoolean } from "graphql";
import { GraphQLUpload } from "apollo-server-core"

export default {
    type: GraphQLBoolean,
    description: "Import de fichier adhérent",
    args: {
        file: { type: GraphQLUpload }
    },
    resolve: async (parent, args, context) => {
        let _file = await args.file;
        throw new Error("Grosse erreur");
        console.log("resolve upload file", _file.filename);
        //console.log("resolve upload file", args.file.stream.filename);
        return true;
    }
} as GQLField