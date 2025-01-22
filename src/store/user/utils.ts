import { UserResponse } from "../../api/user/types";
import { UserState } from "./userSlice";

export const marshallUser = (userResponse: UserResponse): UserState => {
    if (!userResponse.id) {
        return {
            id: '',
            name: '',
            email: '',
            AppRoles: [],
            IsAuthenticated: false
        };
    }
    return {
        id: userResponse.id,
        name: userResponse.username,
        email: userResponse.email,
        AppRoles: userResponse.roles?.map((role) => role.Name) ?? [],
        IsAuthenticated: true
    };
}

export const marshallUnauthenticatedUser = (userResponse: UserResponse): UserState => {
    return {
        id: userResponse.id,
        name: userResponse.username,
        email: userResponse.email,
        AppRoles: userResponse.roles?.map((role) => role.Name) ?? [],
        IsAuthenticated: false
    };
}
