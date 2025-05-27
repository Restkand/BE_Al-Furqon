import prisma from "./prisma"

export const getListVendor = async()=>{
    try {
        return await prisma.ms_vendor.findMany({
            where:{status: "A"},
            select : {
                id:true,
                vendor_id: true,
                vendor_name: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const getListVendorID = async(id:string)=>{
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_vendor.findUnique({
            where:{id: idAsNumber},
            select : {
                vendor_id: true,
                vendor_name: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const insertVendor = async(vendorID:string, vendorName : string, status: string,created_by: string,updated_by:string)=>{
    try {
       const result = await prisma.$executeRaw`
        INSERT INTO "ms_vendor" (vendor_id,vendor_name,status,created_by,created_at,updated_by,updated_at)
        VALUES (${vendorID},${vendorName},${status},${created_by},NOW(),${updated_by},NOW())
        `
        return 200;
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const updateVndr = async(vendorName:string,status: string, updated_by: string, id:string)=>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        update "ms_vendor" 
        SET 
        vendor_name = ${vendorName},
        status = ${status},
        updated_by = ${updated_by},
        updated_at = NOW()
        WHERE vendor_id = ${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const deleteVndr = async(id:string,updated_by:string) =>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        Update "ms_vendor" set status='I',updated_by=${updated_by},updated_at=NOW() WHERE vendor_id=${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}