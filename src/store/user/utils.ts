import { UserResponse } from "../../api/user/types";
import { User } from "../../features/user/User";

export const transformUserResponseToUser = (userResponse: UserResponse): User => {
    return {
        id: userResponse.id,
        name: userResponse.username,
        email: userResponse.email,
        AppRoles: userResponse.roles?.map((role) => role.Name) ?? [],
        IsAuthenticated: true
    };
}