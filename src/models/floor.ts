import prisma from "./prisma"

export const getListFloor = async()=>{
    try {
        return await prisma.ms_floor.findMany({
            where:{status: "A"},
            select : {
                id: true,
                floor_id: true,
                floor_name: true,
                filename: true,
                floor_area:true,
                siteid: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const insertFloor = async(floorID: string,site : string,nama:string,area:string, status: string,created_by: string,updated_by:string,filename:string)=>{
    try {
       const result = await prisma.$executeRaw`
        INSERT INTO "ms_floor" (floor_id,siteid,floor_name,filename,status,created_by,created_at,updated_by,updated_at,floor_area)
        VALUES (${floorID},${site},${nama},${filename},${status},${created_by},NOW(),${updated_by},NOW(),${area})
        `
        return result;
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const getFloorByID = async (id:string) => {
    try {
        const idNumber = Number(id)
        return await prisma.ms_floor.findUnique({
            where:{id: idNumber},
            select:{
                floor_id: true,
                floor_name:true,
                siteid:true,
            }
        })
    } catch (err) {
        
    }
}

export const listFloorBySite = async (site: string) => {
    try {
        const result = await prisma.$queryRaw`
        Select id, floor_id, floor_name, filename, status from ms_floor a where a.siteid = ${site} and status = 'A'
        `

        return result
    } catch (error) {
        
    }
}

export const getMapFloorByID = async (id:string) => {
    try {
        const idNumber = Number(id)
        const mapfloor = await prisma.ms_floor.findUnique({
            where:{id:idNumber},
            select:{filename:true}
        })
        return mapfloor?.filename;
    } catch (error) {
        console.error('DB error:', error);
        return null;
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