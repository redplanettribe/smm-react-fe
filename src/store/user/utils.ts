import { UserResponse } from "../../api/user/types";
import { UserState } from "./userSlice";

export const marshallUser = (userResponse: UserResponse): UserState => {
    if (!userResponse.id) {
        return {
            id: '',
            name: '',
            email: '',
            appRoles: [],
            isAuthenticated: false
        };
    }
    return {
        id: userResponse.id,
        name: userResponse.username,
        email: userResponse.email,
        appRoles: userResponse.roles?.map((role) => role.name) ?? [],
        isAuthenticated: true
    };
}

export const marshallUnauthenticatedUser = (userResponse: UserResponse): UserState => {
    return {
        id: userResponse.id,
        name: userResponse.username,
        email: userResponse.email,
        appRoles: userResponse.roles?.map((role) => role.name) ?? [],
        isAuthenticated: false
    };
}
