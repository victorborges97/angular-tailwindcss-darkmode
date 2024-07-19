export interface GetTopicModel {
    id: number
    slug: string
    title: string
    forum: GetTopicModelForum
    createdAt: string
    author: GetTopicModelAuthor
    comments: GetTopicModelComment[]
    content: string
    tags: GetTopicModelTag[]
}

export interface GetTopicModelForum {
    name: string
    id: number
    imageUrl: string
}

export interface GetTopicModelAuthor {
    imageUrl: string
    name: string
    id: number
}

export interface GetTopicModelComment {
    id: string
    content: string
    createdAt: string
    author: {
        imageUrl: string,
        name: string,
        id: number
    },
    forum: {
        id: number,
        name: string,
        imageUrl: string
    }
}

export interface GetTopicModelTag {
    id: number
    name: string
    tag: string
}
