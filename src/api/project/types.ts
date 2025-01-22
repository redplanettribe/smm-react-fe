export interface Project {
    id: string
    name: string
    ideaQueue: string[]
    postQueue: string[]
    description: string
    createdAt: string
    updatedAt: string
    createdBy: string
}

export interface ProjectUser {
    id: string
    name: string
    email: string
    default_user: boolean
    added_at: string
    max_role: number
}

export interface GetProjectResponse {
    Project: Project
    Users: ProjectUser[]
}
