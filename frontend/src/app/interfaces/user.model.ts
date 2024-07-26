export interface GetUserModel {
    id: number,
    name: string;
    imageUrl: string;
    usuario: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        topics: number;
        Comment: number;
    }
}

export interface UserModel {
    id: number,
    name: string;
    imageUrl: string;
    usuario: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
