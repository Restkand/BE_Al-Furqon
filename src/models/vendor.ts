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
        return await prisma.ms_vendor.create({
            data:{
                vendor_id: vendorID,
                vendor_name: vendorName,
                status: status,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const updateVndr = async(vendorName:string,status: string, updated_by: string, id:string)=>{
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_vendor.update({
            where:{
                id: idAsNumber
            },
            data:{
                vendor_name: vendorName,
                status: status,
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const deleteVndr = async(id:string,updated_by:string) =>{
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_vendor.update({
            where: { 
                id: idAsNumber
            },
            data:{
                status: "X",
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}