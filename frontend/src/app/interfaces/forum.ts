export interface Forum {
    id: number
    imageUrl: string
    name: string
    description: string
    createdAt: string
    user: UserForum
    topics: TopicCount[]
}

export interface ForumCreate {
    imageUrl: string
    name: string
    description: string
    userId: number
}

export interface UserForum {
    id: number
    name: string
    imageUrl: string
}

export interface TopicCount {
    _count: Count
}

export interface Count {
    comments: number
    tags: number
    userStarsTopic: number
}
