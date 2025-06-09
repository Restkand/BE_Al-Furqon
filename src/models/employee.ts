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

export const insertEmp = async (employeeid: string,employeename: string,employeetype: string,vendor: string,beacon: string,site:string,department: string,phone:string,filename:string,status:string,created_by:string,updated_by: string) => {
    try {
        return await prisma.ms_employee.create({
            data:{
                employee_id: employeeid,
                employee_name: employeename,
                employee_type: employeetype,
                vendor_id: vendor,
                beacon_id: beacon,
                siteid: site,
                department_id: department,
                emp_phone: phone,
                photo: filename,
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

export const updateEmployee = async(id: any, employeeName: string,employeePhone: string, department: string, employeeType: string,vendor: string,beacon:string,status: string,filename:string,updated_by: string) => {
    try {
        const idAsNumber = Number(id)
        return await prisma.ms_employee.update({
            where:{
                id: idAsNumber
            },
            data:{
                employee_name: employeeName,
                employee_type: employeeType,
                emp_phone: employeePhone,
                beacon_id: beacon,
                department_id: department,
                vendor_id: vendor,
                status: status,
                photo: filename,
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to create vendor:', error);
        throw error;
    }
}

export const getEmployeeDetail = async (id: number) => {
    try {
      return await prisma.ms_employee.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error("Failed to fetch employee detail");
    }
  };

export const deleteEmployee = async (id:number, updated_by: string) => {
    try {
        return await prisma.ms_employee.update({
            where:{id},
            data:{
                status: "X",
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        throw new Error("Failed to fetch employee detail");
    }
}

// export const insertEmployee = async(empoyeeId: string, employeeName: string, empPhone: string, vendor: string, department: string,empType: string,beacon: string, status: string,created_by: string,created_at: string) => {

// }