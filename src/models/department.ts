import prisma from "./prisma"

export const getListDepart = async()=>{
    try {
        return await prisma.ms_department.findMany({
            where:{status: "A"},
            select : {
                id: true,
                department_id: true,
                department_name:true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list department:', error);
        throw error;
    }
}

export const insertDepart = async(departmentCode : string,departmentName : string, status: string,created_by: string,updated_by:string)=>{
    try {
        return await prisma.ms_department.create({
            data:{
                department_id: departmentCode,
                department_name: departmentName,
                status: status,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        });
    } catch (error) {
        console.error('Failed to create department:', error);
        throw error;
    }
}

export const updateDepart = async(departmentCode : string,departmentName : string,status: string, updated_by: string, id:string)=>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        update "ms_department" 
        SET 
        department_id = ${departmentCode},
        department_name = ${departmentName},
        status = ${status},
        updated_by = ${updated_by},
        updated_at = NOW()
        WHERE vendorid = ${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create department:', error);
        throw error;
    }
}

export const deleteDepart = async(id:string,updated_by:string) =>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        Update "ms_department" set status='I',updated_by=${updated_by},updated_at=NOW() WHERE vendorid=${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create department:', error);
        throw error;
    }
}