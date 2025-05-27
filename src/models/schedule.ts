import prisma from "./prisma";


export const getListSchedule = async() => {
    try {
        const rawData = await prisma.$queryRawUnsafe<any[]>(`
            SELECT 
              emp.id,
              emp.employee_id,
              emp.employee_name,
              emp.siteid,
              emp.department_id,
              emp.employee_type,
              emp.beacon_id,
              emp.vendor_id,
              scc.scheduleid,
              scd.track_id as trackid,
              sc.schedule_name as scname,
              scd.sch_start,
              scd.sch_end
            FROM ms_employee emp
            LEFT JOIN ms_schcontrols scc ON emp.employee_id = scc.employeeid
            inner join ms_schcontrols_detail scd ON scc.scheduleid = scd.schedule_id
            inner join ms_schedule sc on scd.set_id = sc.scheduleid
            WHERE emp.status = 'A'
          `);
        
          // Group by employee_id
          const grouped = new Map();
        
          rawData.forEach((row) => {
            if (!grouped.has(row.employee_id)) {
              grouped.set(row.employee_id, {
                no: grouped.size + 1,   
                empid: row.employee_id,
                name: `${row.employee_name}`, //(${row.employee_id})`, // Adjust as needed
                position: row.employee_type || 'UNKNOWN',
                sets: [],
              });
            }
        
            if (row.scheduleid) {
              grouped.get(row.employee_id).sets.push({
                set: row.scname,//`SET ${row.scheduleid}`, // You can rename or format this
                track: row.trackid,
                start: row.sch_start,
                finish: row.sch_end,
              });
            }
          });
        
          return Array.from(grouped.values());
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const getListSetSchedule = async (department: string) => {
    try {
        return await prisma.ms_schedule.findMany({
            where:{
                status: "A",
                department_id: department
            },
            select:{
                scheduleid: true,
                schedule_name: true,
                schedule_description: true,
                department_id: true,
                status: true
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const insertSetChedule = async (scheduleName: string, scheduleDesc : string, department : string, created_by: string, updated_by: string) => {
    try {
        // const res = await prisma.$executeRaw`
        // INSERT INTO ms_schedule(schedule_name,schedule_description,department_id,created_by,created_at,updated_by,updated_at)
        // VALUES (${scheduleName},${scheduleDesc},${department},${created_by},NOW(),${updated_by},NOW())
        // `
        // return res
        return await prisma.ms_schedule.create({
            data:{
                schedule_name: scheduleName,
                schedule_description: scheduleDesc,
                department_id: department,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date(),
                status: "A"
            }
        });
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    
    }
}

interface DetailInput {
    setId: string;
    trackId: string;
    start: Date;
    end: Date;
  }

export const insertScheduleControl =  async(scheduleID : string,details: DetailInput[],employee: string,created_by: string,updated_by: string) => {
    try {
        const result = await prisma.$transaction([
            prisma.ms_schcontrols.create({
                data: {
                    scheduleid: scheduleID,
                    created_by: created_by,
                    created_at: new Date(),
                    updated_by: updated_by,
                    updated_at: new Date(),
                    employeeid: employee,
                },
            }),
            ...details.map((detail: any) => prisma.ms_schcontrols_detail.create({
                data:{
                    schedule_id: scheduleID,
                    set_id: detail.setId,
                    track_id: detail.trackId,
                    sch_start: detail.start,
                    sch_end: detail.end,
                    created_by: created_by,
                    created_at: new Date(),
                    updated_by: updated_by,
                    updated_at: new Date()
                }
            }))
        ])

        const master = result[0];
      const detailCount = result.length - 1;
      return {
        success: true,
        message: 'Route and details inserted successfully',
        data: {
          master,
          insertedDetails: detailCount,
        },
      };
        // return await prisma.ms_schcontrols.create({
        //     data:{
        //         scheduleid: scheduleID,
        //         created_by: created_by,
        //         created_at: new Date(),
        //         updated_by: updated_by,
        //         updated_at: new Date(),
        //         employeeid: employee
        //     }
        // })
    } catch (error) {
        console.error('Failed to insert', error);
        throw error;
    }
}
