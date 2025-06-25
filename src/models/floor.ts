import prisma from "./prisma";

export const getListFloor = async () => {
  try {
    const floor = await prisma.ms_floor.findMany({
      where: { status: "A" },
    });
    const siteIds = floor
      .map((f) => f.siteid)
      .filter((id): id is string => id !== null && id !== undefined);

    // Convert to numbers, filtering out NaN
    const idAsNumbers = siteIds
      .map((id) => Number(id))
      .filter((id): id is number => !isNaN(id));
    const sites = await prisma.ms_site.findMany({
      where: {
        siteid: { in: idAsNumbers },
      },
      select: {
        siteid: true,
        site_name: true,
      },
    });
    const siteMap = new Map(sites.map((site) => [site.siteid, site.site_name]));

    const result = floor.map((floor) => {
      const siteIdNumber = floor.siteid ? Number(floor.siteid) : null;
      const siteName = siteIdNumber !== null ? siteMap.get(siteIdNumber) : null;

      return {
        ...floor,
        site_name: siteName || null,
      };
    });

    return result;
  } catch (error) {
    console.error("Failed to get list vendor:", error);
    throw error;
  }
};

export const insertFloor = async (
  floorID: string,
  site: string,
  nama: string,
  area: string,
  status: string,
  created_by: string,
  updated_by: string,
  filename: string
) => {
  try {
    return await prisma.ms_floor.create({
      data: {
        floor_id: floorID,
        siteid: site,
        floor_name: nama,
        filename: filename,
        status: status,
        floor_area: area,
        created_by: created_by,
        created_at: new Date(),
        updated_by: updated_by,
        updated_at: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to create vendor:", error);
    throw error;
  }
};

export const getFloorByID = async (id: string) => {
  try {
    const idNumber = Number(id);
    return await prisma.ms_floor.findUnique({
      where: { id: idNumber },
      select: {
        floor_id: true,
        floor_name: true,
        siteid: true,
      },
    });
  } catch (err) {}
};

export const listFloorBySite = async (site: string) => {
  try {
    const result = await prisma.$queryRaw`
        Select id, floor_id, floor_name, filename, status from ms_floor a where a.siteid = ${site} and status = 'A'
        `;

    return result;
  } catch (error) {}
};

export const getMapFloorByID = async (id: string) => {
  try {
    const idNumber = Number(id);
    const mapfloor = await prisma.ms_floor.findUnique({
      where: { id: idNumber },
      select: { filename: true },
    });
    return mapfloor?.filename;
  } catch (error) {
    console.error("DB error:", error);
    return null;
  }
};

export const updateFl = async (
  vendorName: string,
  status: string,
  updated_by: string,
  id: string
) => {
  try {
    const idAsNumber = Number(id);
    return await prisma.ms_vendor.update({
      where: {
        id: idAsNumber,
      },
      data: {
        vendor_name: vendorName,
        status: status,
        updated_by: updated_by,
        updated_at: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to create vendor:", error);
    throw error;
  }
};

export const deleteFl = async (id: string, updated_by: string) => {
  try {
    const idAsNumber = Number(id);
    return await prisma.ms_floor.update({
      where: {
        id: idAsNumber,
      },
      data: {
        status: "X",
        updated_by: updated_by,
        updated_at: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to create vendor:", error);
    throw error;
  }
};
