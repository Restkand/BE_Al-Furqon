import prisma from "./prisma"

export const getListBeacon = async()=>{
    try {
        return await prisma.ms_beacon.findMany({
            where:{status: "A"},
            select : {
                beacon_id:true,
                beacon_name: true,
                beacon_battery: true,
                beacon_mac_addr:true,
                beacon_battery_at: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const insertBeacon = async(beaconCode:string,site:string,name:string,employee:string,beaconMacAddr:string,beaconBattery:string,BeaconBatteryCreat:string,status: string,created_by: string,updated_by:string)=>{
    try {
       const result = await prisma.$executeRaw`
        INSERT INTO "ms_beacon" (beacon_id,siteid,beacon_name,employee_id,beacon_mac_addr,beacon_battery,beacon_battery_at,status,created_by,created_at,updated_by,updated_at)
        VALUES (${beaconCode},${site},${name},${employee},${beaconMacAddr},${beaconBattery},${BeaconBatteryCreat},${status},${created_by},NOW(),${updated_by},NOW())
        `
        return result;
    } catch (error) {
        console.error('Failed to create beacon:', error);
        throw error;
    }
}

export const updateBeacon = async(site:string,name:string,employee:string,beaconMacAddr:string,beaconBattery:string,BeaconBatteryCreat:string,status: string, updated_by: string, id:string)=>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        update "ms_beacon" 
        SET 
        siteid =${site},
        beacon_name = ${name},
        employee_id = ${employee},
        beacon_mac_addr= ${beaconMacAddr},
        beacon_battery = ${beaconBattery},
        beacon_battery_at = ${BeaconBatteryCreat},
        status = ${status},
        updated_by = ${updated_by},
        updated_at = NOW()
        WHERE id = ${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create beacon:', error);
        throw error;
    }
}

export const deleteBeacon = async(id:string,updated_by:string) =>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        Update "ms_beacon" set status='I',updated_by=${updated_by},updated_at=NOW() WHERE id=${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to create beacon:', error);
        throw error;
    }
}