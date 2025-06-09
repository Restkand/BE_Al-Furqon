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

export const updateAlibiAlert = async(id:string,name:string,updated_by: string) => {
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_alert_reason.update({
            where:{
                id: idAsNumber
            },
            data:{
                reason_name: name,
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to created Alibi', error);
        throw error
    }
}

export const deleteAlibiAlert = async(id:string,updated_by: string) => {
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_alert_reason.update({
            where:{
                id: idAsNumber
            },
            data:{
                status: "X",
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to created Alibi', error);
        throw error
    }
}

export const listAlertType = async() => {
    try {
        return await prisma.ms_alerttype.findMany({
            select:{
                reason_type_id : true,
                reason_type_name: true,
                created_by: true
            }
        })
    } catch (error) {
        console.error('Failed to created Alibi', error);
        throw error
    }
}

export const insertAlertType = async(type_name: string, created_by: string,updated_by: string) => {
    try {
        return await prisma.ms_alerttype.create({
            data:{
                reason_type_name: type_name,
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

export const updateAlertType = async(type_id:string,type_name: string,updated_by: string) => {
    try {
        const idAsNumber = Number(type_id)
        return await prisma.ms_alerttype.update({
            where:{
                reason_type_id: idAsNumber
            },
            data:{
                reason_type_name: type_name,
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to created Alibi', error);
        throw error
    }
}

export const deleteAlertType = async(type_id:string,updated_by: string) => {
    try {
        const idAsNumber = Number(type_id)
        return await prisma.ms_alerttype.update({
            where:{
                reason_type_id: idAsNumber
            },
            data:{
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to created Alibi', error);
        throw error
    }
}