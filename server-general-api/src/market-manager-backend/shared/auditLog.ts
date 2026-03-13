export const auditLog = (action: string, entity: string, id: string, user: string) =>
    console.log(`[AUDIT] ${new Date().toISOString()} | ${action} | ${entity}:${id} | user:${user}`);
