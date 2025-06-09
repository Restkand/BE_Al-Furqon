import prisma from "./prisma"

export const listquestion = async() => {
    try {
        const question = await prisma.$queryRaw`
        select 
        a.id,
        a.qre_for,
        a.qre_type,
        b.id,
        b.qre_id,
        b.qre_listname,
        b.qre_point_plus,
        b.qre_point_min
        from ms_qre a
        inner join ms_qre_detail b on a.qre_id = b.qre_id
        inner join ms_qre_detail_quest c on b.id = c.detail_id::int
        `
        return question
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const createQuestList = async (qre_id: string,listname: string,qre_point_plus: string, qre_point_min: string, created_by: string, updated_by: string) => {
    try {
        const header = await prisma.ms_qre.create({
            data: {
                qre_id: qre_id,
                created_by: created_by,
                created_at: new Date(),
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
        await prisma.ms_qre_detail.create({
            data:{
                qre_id: header.qre_id,
                qre_listname: listname,
                qre_point_plus: qre_point_plus,
                qre_point_min: qre_point_min,
                status: "A",
                created_by: created_by,
                created_at: new Date,
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const createQuestDetail = async(detailid: string, question: string, qre_point_plus: string, qre_point_min: string, created_by: string, updated_by: string) => {
    try {
        return await prisma.ms_qre_detail_quest.create({
            data:{
                detail_id: detailid,
                qre_quest: question,
                qre_point_plus: qre_point_plus,
                qre_point_min: qre_point_min,
                status:"A",
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

export const listDetailQuest = async(qre_id: string) => {
    try {
        const qrelist = await prisma.ms_qre_detail.findMany({where:{qre_id:qre_id}})
        const detailIds = qrelist.map(item => item.id.toString());

        // find all quests where detail_id is in those ids
        const qrequest = await prisma.ms_qre_detail_quest.findMany({
          where: {
            detail_id: {
              in: detailIds
            }
          }
        });

        const groupedQuests = qrequest.reduce((acc, quest) => {
            const key = quest.detail_id!;
            if (!acc[key]) acc[key] = [];
            acc[key].push(quest);
            return acc;
          }, {} as Record<string, typeof qrequest>);
          
          const result = qrelist.map(detail => ({
            ...detail,
            detail: groupedQuests[detail.id.toString()] || []
          }));
          
          return result

    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const updateQre = async(qre_id: string, qre_for: string, qre_type: string, updated_by: string) => {
    try {
        const idAsNumber = Number(qre_id)
        return await prisma.ms_qre.update({
            where:{
                id: idAsNumber
            },
            data:{
                qre_for: qre_for,
                qre_type: qre_type,
                updated_at: new Date(),
                updated_by: updated_by
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const updateQreDetail = async(qre_id: any, qre_quest: any, qre_point_plus: string, qre_point_min: string,question: string, qre_point_plus_quest: string, qre_point_min_quesst: string, updated_by: string) => {
    try {
        await prisma.$transaction(async(tx)=>{
            await tx.ms_qre_detail.update({
                where : {
                    id: qre_id
                },
                data:{
                    qre_point_plus: qre_point_plus,
                    qre_point_min: qre_point_min,
                    updated_by: updated_by,
                    updated_at: new Date()
                }
            })
            for(const quest of qre_quest){
                await tx.ms_qre_detail_quest.update({
                    where:{
                        id: quest.id
                    },
                    data:{
                        qre_quest: question,
                        qre_point_plus: qre_point_plus_quest,
                        qre_point_min: qre_point_min_quesst,
                        updated_by: updated_by,
                        updated_at: new Date()
                    }
                })
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const deleteQre = async(id: any,updated_by: string) => {
    try {
        return await prisma.ms_qre_detail.update({
            where:{
                id: id
            },
            data:{
                status: "X",
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}

export const deleteQreDetail = async(id: any,updated_by: string) => {
    try {
        return await prisma.ms_qre_detail_quest.update({
            where:{
                id: id
            },
            data:{
                status: "X",
                updated_by: updated_by,
                updated_at: new Date()
            }
        })
    } catch (error) {
        console.error('Failed to get list vendor:', error);
        throw error;
    }
}