import prisma from "./prisma"

export const getListFloor = async()=>{
    try {
        return await prisma.ms_vendor.findMany({
            where:{status: "A"},
            select : {
                vendor_name: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const insertFloor = async(site : string,nama:string,area:string, status: string,created_by: string,updated_by:string)=>{
    try {
       const result = await prisma.$executeRaw`
        INSERT INTO "ms_floor" (floor_id,siteid,floor_name,filename,status,created_by,created_at,updated_by,updated_at)
        VALUES (${site},${status},${created_by},NOW(),${updated_by},NOW())
        `
        return result;
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const updateFl = async(vendorName:string,status: string, updated_by: string, id:string)=>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        update "ms_vendor" 
        SET 
        vendor_name = ${vendorName},
        status = ${status},
        updated_by = ${updated_by},
        updated_at = NOW()
        WHERE vendorid = ${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const deleteFl = async(id:string,updated_by:string) =>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        Update "ms_vendor" set status='I',updated_by=${updated_by},updated_at=NOW() WHERE vendorid=${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}