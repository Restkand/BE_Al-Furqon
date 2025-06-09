import prisma from "../models/prisma";

export const generateId = async (): Promise<string> => {
  try {
    const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(route_id) AS counted
        FROM ms_route
      `);

    const count = result[0]?.counted || 0;
    const nextNumber = count + 1;

    // Format to "RTE00001", "RTE00002", etc.
    const generatedId = `RTE${nextNumber.toString().padStart(5, "0")}`;
    return generatedId;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};

export const generateScheduleID = async (): Promise<string> => {
  try {
    const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(scheduleid) AS counted
        FROM ms_schcontrols
      `);

    // Convert to BigInt explicitly, then back to string
    const count = BigInt(result[0]?.counted || 0);
    const nextNumber = count + BigInt(1);
    const generate = `SCH${nextNumber.toString().padStart(5, "0")}`;

    return generate;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};

export const generateTeamID = async (): Promise<string> => {
  try {
    const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(team_id) AS counted
        FROM ms_batch_team
        `);
    // Convert to BigInt explicitly, then back to string
    const count = BigInt(result[0]?.counted || 0);
    const nextNumber = count + BigInt(1);
    const generate = `BAT${nextNumber.toString().padStart(5, "0")}`;

    return generate;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};

export const generateAlibiID = async (): Promise<string> => {
  try {
    const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT Count(reason_id) 
        from ms_alert_reason
        `);
    const count = BigInt(result[0]?.counted || 0);
    const nextNumber = count + BigInt(1);
    const generate = `ALB${nextNumber.toString().padStart(5, "0")}`;

    return generate;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};

export const generateQuestionID = async (): Promise<string> => {
  try {
    const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(qre_id) AS counted
        FROM ms_qre
      `);

    // Convert to BigInt explicitly, then back to string
    const count = BigInt(result[0]?.counted || 0);
    const nextNumber = count + BigInt(1);
    const generate = `QRE${nextNumber.toString().padStart(5, "0")}`;

    return generate;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};

export const generateZoneID = async (): Promise<string> => {
  try {
    const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(zone_id) AS counted
        FROM ms_zone
      `);

    // Convert to BigInt explicitly, then back to string
    const count = BigInt(result[0]?.counted || 0);
    const nextNumber = count + BigInt(1);
    const generate = `ZNE${nextNumber.toString().padStart(5, "0")}`;

    return generate;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};

export const generateEmpID = async (): Promise<string> => {
  try {
    const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(employee_id) AS counted
        FROM ms_employee
      `);

    // Convert to BigInt explicitly, then back to string
    const count = BigInt(result[0]?.counted || 0);
    const nextNumber = count + BigInt(1);
    const generate = `EMP${nextNumber.toString().padStart(5, "0")}`;

    return generate;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};

export const generateBeaconID = async (): Promise<string> => {
  try {
    const result: any[] = await prisma.$queryRawUnsafe(`
        SELECT COUNT(beacon_id) AS counted
        FROM ms_beacon
      `);

    // Convert to BigInt explicitly, then back to string
    const count = BigInt(result[0]?.counted || 0);
    const nextNumber = count + BigInt(1);
    const generate = `BE${nextNumber.toString().padStart(6, "0")}`;

    return generate;
  } catch (error) {
    console.error("Error generating ID:", error);
    throw error;
  }
};
