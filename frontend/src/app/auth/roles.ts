// roles.ts
export enum Role {
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN'
}

export const RolePermissions = {
    [Role.USER]: {
        canViewForums: true,
        canViewTopics: true,
        canCreateTag: true,
        canDeleteTag: false,
        canCreateTopic: true,
        canEditTopic: false,
        canDeleteTopic: false,
        canComment: true,
        canModerate: false
    },
    [Role.MODERATOR]: {
        canViewForums: true,
        canViewTopics: true,
        canCreateTag: true,
        canDeleteTag: true,
        canCreateTopic: true,
        canEditTopic: true,
        canDeleteTopic: true,
        canComment: true,
        canModerate: true
    },
    [Role.ADMIN]: {
        canViewForums: true,
        canViewTopics: true,
        canCreateTag: true,
        canDeleteTag: true,
        canCreateTopic: true,
        canEditTopic: true,
        canDeleteTopic: true,
        canComment: true,
        canModerate: true,
        canManageUsers: true
    }
};
