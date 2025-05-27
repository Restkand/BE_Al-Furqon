import prisma from "./prisma"

export const getListSite = async()=>{
    try {
        return await prisma.ms_site.findMany({
            where:{status: "A"},
            select : {
                siteid: true,
                site_name: true,
                site_address:true,
                site_cluster:true,
                site_code: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list site:', error);
        throw error;
    }
}

export const insertSite = async(siteCode: string,site_name : string, site_address: string,site_cluster : string, status: string,created_by: string,updated_by:string)=>{
    try {
       const result = await prisma.$executeRaw`
        INSERT INTO "ms_site" (site_name,site_address,site_cluster,status,created_by,created_at,updated_by,updated_at,site_code)
        VALUES (${site_name},${site_address},${site_cluster},${status},${created_by},NOW(),${updated_by},NOW(),${siteCode})
        `
        return result;
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const updateSite = async(site_name : string, site_address: string,site_cluster : string,status: string, updated_by: string, id:string)=>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        update "ms_site" 
        SET 
        site_name = ${site_name},
        site_address = ${site_address},
        site_cluster = ${site_cluster},
        status = ${status},
        updated_by = ${updated_by},
        updated_at = NOW()
        WHERE siteid = ${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create site:', error);
        throw error;
    }
}

export const deleteSite = async(id:string,updated_by:string) =>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        Update "ms_site" set status='X',updated_by=${updated_by},updated_at=NOW() WHERE siteid=${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}