import { UserResponse } from "../../api/user/types";
import { User } from "./userSlice";

export const marshallUser = (userResponse: UserResponse): User => {
    return {
        id: userResponse.id,
        name: userResponse.username,
        email: userResponse.email,
        AppRoles: userResponse.roles?.map((role) => role.Name) ?? [],
        IsAuthenticated: true
    };
}

export const marshallUnauthenticatedUser = (userResponse: UserResponse): User => {
    return {
        id: userResponse.id,
        name: userResponse.username,
        email: userResponse.email,
        AppRoles: userResponse.roles?.map((role) => role.Name) ?? [],
        IsAuthenticated: false
    };
}
