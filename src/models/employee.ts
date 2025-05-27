import prisma from "./prisma"

export const getListEmployee = async() => {
    return await prisma.ms_employee.findMany({
        where:{status: "A"},
        select:{
            id:true,
            employee_id: true,
            employee_name: true,
            employee_type: true,
            department_id: true,
            beacon_id: true,
            siteid: true,
            status: true
        }
    })
}

export const listemploy = async(routeid: string) => {
    try {
        const employ = await prisma.$queryRaw`
        select * 
        from ms_employee a 
        inner join ms_schcontrols b on a.employee_id = b.employeeid 
        inner join ms_schcontrols_detail c on b.scheduleid = c.schedule_id 
        where c.track_id = ${routeid}
        ` 
        return employ
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
} 

export const insertEmp = async (employeeid: string,employeename: string,employeetype: string,vendor: string,beacon: string,site:string,department: string,status:string,created_by:string,updated_by: string) => {
    try {
        const result = await prisma.$executeRaw`
        INSERT INTO "ms_employee" (employee_id,siteid,employee_name,department_id,employee_type,beacon_id,status,created_by,created_at,updated_by,updated_at,vendor_id)
        VALUES(${employeeid},${site},${employeename},${department},${employeetype},${beacon},${status},${created_by},NOW(),${updated_by},NOW(),${vendor})
        `
        return result
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

// export const insertEmployee = async(empoyeeId: string, employeeName: string, empPhone: string, vendor: string, department: string,empType: string,beacon: string, status: string,created_by: string,created_at: string) => {

// }