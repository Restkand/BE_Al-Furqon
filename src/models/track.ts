import prisma from "./prisma";

export const getListTrack = async (site: string, floor: string) => {
  try {
    return await prisma.ms_track.findMany({
      where: { status: "A", siteid: site, floor: floor },
      select: {
        trackid: true,
        track_name: true,
        status: true,
        floor: true,
        siteid: true,
      },
    });
  } catch (error) {
    console.error("Failed to get list track:", error);
    throw error;
  }
};

export const getTrackByID = async (id: any) => {
  try {
    const idAsNumber = Number(id);
    const track = await prisma.ms_track.findUnique({
      where: { trackid: idAsNumber },
      select: {
        trackid: true,
        siteid: true,
        track_name: true,
        floor: true,
      },
    });
    if (!track) {
      throw new Error(`Track with ID ${idAsNumber} not found`);
    }
    const floorid = await prisma.ms_floor.findFirst({
      where: { floor_id: track.floor },
      select: {
        id: true,
        floor_area: true,
        floor_name: true,
        floor_id: true,
      },
    });
    return {
      ...track,
      floorid, // return floor details under the key "floor"
    };
  } catch (error) {
    console.error("Failed to get list track:", error);
    throw error;
  }
};

export const createTrack = async (
  trackName: string,
  site: any,
  floor: string,
  created_by: string,
  updated_by: string
) => {
  try {
    return await prisma.ms_track.create({
      data: {
        track_name: trackName,
        siteid: String(site),
        floor: floor,
        created_at: new Date(),
        created_by: created_by,
        updated_at: new Date(),
        updated_by: updated_by,
        status: "A",
      },
    });
  } catch (error) {
    console.error("Failed to create vendor:", error);
    throw error;
  }
};

export const listTrackType = async () => {
  try {
    return await prisma.ms_track_type.findMany({
      select: {
        id: true,
        track_type: true,
      },
    });
  } catch (error) {
    console.error("Failed to create vendor:", error);
    throw error;
  }
};

export const createTrackType = async (
  type: string,
  created_by: string,
  updated_by: string
) => {
  try {
    return await prisma.ms_track_type.create({
      data: {
        track_type: type,
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
