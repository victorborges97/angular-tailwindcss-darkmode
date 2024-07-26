// authMiddleware.ts
import { RolePermissions, Role } from './roles';

function hasPermission(role: Role, action: keyof typeof RolePermissions[Role]) {
    return RolePermissions[role][action];
}

export function authorize(role: Role, action: keyof typeof RolePermissions[Role]) {
    return (req, res, next) => {
        if (hasPermission(role, action)) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    };
}
