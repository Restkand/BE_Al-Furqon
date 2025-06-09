import prisma from "./prisma";

export const listZone = async () => {
    try {
        const zones = await prisma.ms_zone.findMany()
        const data = await Promise.all(zones.map(async(zone)=>{
            const zoneDetails = await prisma.ms_zone_detail.findMany({
                where:{
                    zone_id: zone.zone_id || ''
                }
            })
            let totalGateway = 0
            for(const detail of zoneDetails){
                const used = parseInt(detail.gateway_used ?? "0")
                const unused = parseInt(detail.gateway_unused ?? "0")
                totalGateway += used + unused;
            }
            return {
                zone_id : zone.zone_id,
                zone_name: zone.zone_name,
                status: zone.status,
                totalGateway
            }
        }))
        return data
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const addZone = async(zoneID: string,zoneName:string, created_by: string, updated_by: string) => {
    try {
        return await prisma.ms_zone.create({
            data:{
                zone_id: zoneID,
                zone_name: zoneName,
                status: "A",
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const addDetailZone = async(zone_id: any, used_gateways:string[], unused_gateways: string[],created_by: string, updated_by: string) => {
    try {

        const now = new Date();

        // Handle used gateways
        for (const gateway of used_gateways) {
          const existing = await prisma.ms_zone_detail.findFirst({
            where: { zone_id, gateway_used: gateway },
          });
          if (existing) {
            // Update
            await prisma.ms_zone_detail.update({
              where: { id: existing.id },
              data: {
                updated_by,
                updated_at: now,
              },
            });
          } else {
            // Insert
            await prisma.ms_zone_detail.create({
              data: {
                zone_id,
                gateway_used: gateway,
                gateway_unused: null,
                created_by,
                updated_by,
                created_at: now,
                updated_at: now,
              },
            });
          }
        }
        
         // Handle unused gateways
    for (const gateway of unused_gateways) {
        const existing = await prisma.ms_zone_detail.findFirst({
          where: { zone_id, gateway_unused: gateway },
        });
  
        if (existing) {
          // Update
          await prisma.ms_zone_detail.update({
            where: { id: existing.id },
            data: {
              updated_by,
              updated_at: now,
            },
          });
        } else {
          // Insert
          await prisma.ms_zone_detail.create({
            data: {
              zone_id,
              gateway_used: null,
              gateway_unused: gateway,
              created_by,
              updated_by,
              created_at: now,
              updated_at: now,
            },
          });
        }
      }
      return;
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const listDetailZone = async(zone_id: string) => {
    try {
        const zone = await prisma.ms_zone.findMany({
            where:{
                zone_id
            },
            select:{
                zone_id: true,
                zone_name: true,
                status: true,
            }
        })
    
        if (!zone) {
            return null
        }
    
        const used = await prisma.ms_zone_detail.findMany({
            where:{zone_id, gateway_used:{not:null}},
            select:{
                id: true,
                zone_id: true,
                gateway_used: true
            }
        })
    
        const unused = await prisma.ms_zone_detail.findMany({
            where:{zone_id, gateway_unused:{not:null}},
            select:{
                id: true,
                zone_id: true,
                gateway_unused: true,
            }
        })
    
        return {
            ...zone,
            used,
            unused,
        }
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
    
}

export const deleteZone = async(zone_id: string, updated_by: string) => {
    try {
        return await prisma.ms_zone.updateMany({
            where:{zone_id : zone_id},
            data:{
                status: "X",
                updated_at: new Date(),
                updated_by: updated_by
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}