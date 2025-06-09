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
        return await prisma.ms_site.create({
            data:{
                site_name: site_name,
                site_address: site_address,
                status: status,
                site_code: siteCode,
                site_cluster: site_cluster,
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

export const updateSite = async(site_name : string, site_address: string,site_cluster : string,status: string, updated_by: string, id:string)=>{
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_site.update({
            where:{
                siteid: idAsNumber
            },
            data:{
                site_name: site_name,
                site_address: site_address,
                site_cluster: site_cluster,
                status: status,
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to create site:', error);
        throw error;
    }
}

export const deleteSite = async(id:string,updated_by:string) =>{
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_site.update({
            where:{
                siteid: idAsNumber
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