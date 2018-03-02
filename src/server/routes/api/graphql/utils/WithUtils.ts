import { GraphQlContext } from "..";
import { testPermissions } from "auths";

export const withPermissions = (permissions: number[]) => {
    return (callback:(root, args, context: GraphQlContext) => Promise<any> | void) => {
        return (_root, _args, _context: GraphQlContext) => {
            // -- test permissions
            let _auth = testPermissions(permissions, _context.credentials);
            if(!_auth) throw new Error("Not authorized");
            return callback(_root, _args, _context);
        }
    }
}
