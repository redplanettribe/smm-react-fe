import { ProjectUser } from "../../api/project/types";
import { User } from "./projectSlice";

export const PROJECT_ROLES = {
    1: 'Member',
    2: 'Manager',
    3: 'Owner',
} as const;

export const addRole = (users: ProjectUser[]): User[] => {
    return users.map(user => {
        return {
            ...user,
            role: PROJECT_ROLES[user.maxRole as keyof typeof PROJECT_ROLES]
        }
    })
}
