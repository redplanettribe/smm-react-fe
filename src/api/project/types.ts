export interface Project {
  id: string;
  name: string;
  ideaQueue: string[];
  postQueue: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ProjectUser {
  id: string;
  name: string;
  email: string;
  defaultUser: boolean;
  addedAt: string;
  maxRole: number;
}

export interface GetProjectResponse {
  project: Project;
  users: ProjectUser[];
}

export interface DefaultUserPlatformInfo {
  isAuthenticated: boolean;
  authTTL: string;
}
