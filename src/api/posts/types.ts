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

export type PostStatus =
  | 'draft'
  | 'queued'
  | 'scheduled'
  | 'published'
  | 'partially_published'
  | 'failed'
  | 'archived';

export enum PostStatusEnum {
  DRAFT = 'draft',
  QUEUED = 'queued',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  PARTIALLY_PUBLISHED = 'partially_published',
  FAILED = 'failed',
  ARCHIVED = 'archived',
}
