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
    createdAt: string;
    updatedAt: string;
}