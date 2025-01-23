
export interface DownloadMetadata {
    url: string;
    urlThumbnail: string;
    id: string;
    postId: string;
    filename: string;
    mediaType: string;
    format: string;
    width: number;
    height: number;
    length: number;
    size: number;
    altText: string;
    addedBy: string;
    createdAt: string;
}

export interface UploadMediaRequest {
    projectID: string;
    postID: string;
    file: File;
    alt_text: string;
}