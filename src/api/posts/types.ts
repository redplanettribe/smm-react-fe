export interface Post {
  id: string;
  projectID: string;
  title: string;
  type: string;
  textContent: string;
  isIdea: boolean;
  status: string;
  createdBy: string;
  scheduledAt: string;
  linkedPlatforms: Platform[];
  createdAt: string;
  updatedAt: string;
}

export interface Platform {
  id: string;
  name: string;
}
