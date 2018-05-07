import { GraphQLObjectType } from "graphql";

import addPermissionToGroup from "./addPermissionToGroup";
import addUserToGroup from "./addUserToGroup"
import createGroup from "./createGroup"
import createUser from "./createUser"
import removeGroup from "./removeGroup"
import removePermissionToGroup from "./removePermissionToGroup"
import removeUser from "./removeUser"
import removeUserToGroup from "./removeUserToGroup"
import updateGroup from "./updateGroup"
import updateUser from "./updateUser"

export const MutationSystem =  new GraphQLObjectType({
    name: "MutationSystem",
    fields: {
        createUser,
        updateUser,
        removeUser,
        createGroup,
        updateGroup,
        removeGroup,
        addPermissionToGroup,
        removePermissionToGroup,
        addUserToGroup,
        removeUserToGroup
    }
})