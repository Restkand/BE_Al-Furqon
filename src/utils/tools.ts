import prisma from "../models/prisma";

export const generateId = async (): Promise<string> => {
    try {
      const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(route_id) AS counted
        FROM ms_route
        WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
      `);
  
      const count = result[0]?.counted || 0;
      const nextNumber = count + 1;
  
      // Format to "RTE00001", "RTE00002", etc.
      const generatedId = `RTE${nextNumber.toString().padStart(5, '0')}`;
      return generatedId;
  
    } catch (error) {
      console.error('Error generating ID:', error);
      throw error;
    }
  };

  export const generateScheduleID = async (): Promise<string> => {
    try {
      const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(scheduleid) AS counted
        FROM ms_schcontrols
        WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
      `);
  
      // Convert to BigInt explicitly, then back to string
      const count = BigInt(result[0]?.counted || 0);
      const nextNumber = count + BigInt(1);
      const generate = `SCH${nextNumber.toString().padStart(5, '0')}`;
  
      return generate;
    } catch (error) {
      console.error('Error generating ID:', error);
      throw error;
    }
  };

  export const generateTeamID = async():Promise<string> => {
    try {
      const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(team_id) AS counted
        FROM ms_batch_team
        WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        `)
         // Convert to BigInt explicitly, then back to string
      const count = BigInt(result[0]?.counted || 0);
      const nextNumber = count + BigInt(1);
      const generate = `BAT${nextNumber.toString().padStart(5, '0')}`;
  
      return generate;
    } catch (error) {
      console.error('Error generating ID:', error);
      throw error;
    }
  }

  export const generateAlibiID = async ():Promise<string> => {
    try {
      const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT Count(reason_id) 
        from ms_alert_reason
        where EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
          AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        `)
        const count = BigInt(result[0]?.counted || 0);
      const nextNumber = count + BigInt(1);
      const generate = `ALB${nextNumber.toString().padStart(5, '0')}`;
  
      return generate;
    } catch (error) {
      console.error('Error generating ID:', error);
      throw error;
    }
  }