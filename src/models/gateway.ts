import prisma from "./prisma"

export const getListGateway = async()=>{
    try {
        return await prisma.ms_gateway.findMany({
            where:{status: "A"},
            select : {
                id: true,
                gateway_id:true,
                siteid : true,
                gateway_name: true,
                floor_id:true,
                gateway_mac_addr: true,
                ip_address: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const listGatewayByFloor = async (floorid: string, site:string) => {
    try {
        const result = await prisma.$queryRaw`
        select id,
        gateway_id,
        siteid,
        gateway_name,
        gateway_mac_addr,
        ip_address,
        x_percent,y_percent,
        status 
        from ms_gateway where floor_id = ${String(floorid)} and siteid = ${site} and status = 'A'
        `
        return result;
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
    
}

export const insertGateway = async(gateway_id:string,site:string,name:string,floor:string, gatewayMacAddr:string,ipAddr:string,x_coordinate:any,y_coordinate:any,status: string,created_by: string,updated_by:string)=>{
    try {
        return await prisma.ms_gateway.create({
            data:{
                gateway_id: gateway_id,
                siteid: site,
                gateway_name: name,
                floor_id: floor,
                gateway_mac_addr: gatewayMacAddr,
                ip_address: ipAddr,
                x_percent: x_coordinate,
                y_percent: y_coordinate,
                status: status,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to create gateway:', error);
        throw error;
    }
}

export const updateGateway = async(site:string,name:string,floor:string, gatewayMacAddr:string,ipAddr:string,status: string,updated_by:string, id:string)=>{
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_gateway.update({
            where:{
                id: idAsNumber,
            },
            data:{
                siteid: site,
                gateway_name: name,
                floor_id: floor,
                gateway_mac_addr: gatewayMacAddr,
                ip_address: ipAddr,
                status: status,
                updated_by: updated_by,
                updated_at: new Date()

            }
        })
    } catch (error) {
        console.error('Failed to create beacon:', error);
        throw error;
    }
}

export const deleteGateway = async(id:string,updated_by:string) =>{
    try {
        const idAsNumber = Number(id);
        return await prisma.ms_gateway.update({
            where:{
                id: idAsNumber,
            },
            data:{
                status: 'X',
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to create beacon:', error);
        throw error;
    }
}

type JoinedGatewayRoute = {
    id: string,
    gatewayid: string,
    name: string,
    x_coordinate: any,
    y_coordinate:any,
    seq: any
}
export const getListGatewayByRoute = async(routeid:any):Promise<JoinedGatewayRoute[]> => {
    try {
        
        const result = await prisma.$queryRaw<JoinedGatewayRoute[]>`
        select a.id, 
        a.gateway_id as gatewayid, 
        gateway_name as name, 
        x_percent as x_coordinate, 
        y_percent as y_coordinate,
        route_seq as seq
         from ms_gateway a inner join ms_route_detail b on a.gateway_id = b.gateway_id where b.route_id = ${routeid}
        `
        return result
    } catch (error) {
        console.error('Failed to get list route:', error);
        throw error;
    }
}