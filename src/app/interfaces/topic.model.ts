export interface TopicModel {
    id: number
    slug: string
    title: string
    forum: TopicModelForum
    createdAt: string
    author: TopicModelAuthor
    _count: TopicModelCount
}

export interface TopicModelCreated {
    id: number
    title: string
    slug: string
    content: string
    forumId: number
    authorId: number
}

export interface TopicModelForum {
    name: string
    id: number
    imageUrl: string
}

export interface TopicModelAuthor {
    imageUrl: string
    name: string
    id: number
}

export interface TopicModelCount {
    comments: number
    userStarsTopic: number
}
