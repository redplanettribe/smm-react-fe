import { User } from '../../store/projects/projectSlice';
import { PROJECT_ROLES, ProjectUser } from './types';

export const addRole = (users: ProjectUser[]): User[] => {
  return users.map((user) => {
    return {
      ...user,
      role: PROJECT_ROLES[user.maxRole as keyof typeof PROJECT_ROLES],
    };
  });
};
