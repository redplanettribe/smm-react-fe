import { DownloadMetadata } from '../media/types';
import { Post } from '../posts/types';

export interface Publisher {
  id: string;
  name: string;
}

export enum PlatformID {
  LINKEDIN = 'linkedin',
  X = 'x',
}

export enum PublishPostStatusEnum {
  READY = 'ready',
  PROCESSING = 'processing',
  PUBLISHED = 'published',
  FAILED = 'failed',
}
export interface PublishPost extends Post {
  secrets: string;
  platform: string;
  publishStatus: PublishPostStatusEnum;
}

export interface PublishPostInfo {
  post: PublishPost;
  media: DownloadMetadata[];
}
