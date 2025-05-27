import prisma from "./prisma";

export const listAlibi = async() => {
    try {
        return await prisma.ms_alert_reason.findMany({
            where:{
                status: "A",
            },
            select:{
                id: true,
                reason_id: true,
                reason_name: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const insertAlibi = async(alibicode: string,name: string, created_by: string, updated_by: string) => {
    try {
        return await prisma.ms_alert_reason.create({
            data : {
                reason_id: alibicode,
                reason_name: name,
                status: "A",
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        })

    } catch (error) {
        console.error('Failed to created Alibi', error);
        throw error
    }
}