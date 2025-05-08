import prisma from "./prisma"

export const getlistUser = async()=>{
    return await prisma.users.findMany({
        where:{status: "A"},
        select:{
            name: true,
            username: true,
            email: true,
            role: true,
            status: true
        }
    })
}

export const checkUserExist = async (username: string) => {
    try {
      const result: any = await prisma.$queryRaw<
        { count: bigint }[]
      >`SELECT COUNT(*)::bigint as count FROM users WHERE username = ${username}`;
  
      return result[0].count > 0;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw error;
    }
  };

export const createUser = async(name:string,username:string,password: string,email:string, role:string,status:string,created_user: string,updated_user:string)=>{
    try {
        const result = await prisma.$executeRaw`
        INSERT INTO "users"(name,username,password,email,role,status,created_user,created_at,updated_user,updated_at)
        VALUES (${name},${username},${password},${email},${role},${status},${created_user},NOW(),${updated_user},NOW())
        `
        return result
    } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
    }
}

export const updateUser = async(name: string,email:string,id: string,role:string,status:string,updated_user:string)=>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        UPDATE "users"
        SET name = ${name},
            email = ${email},
            role = ${role},
            updated_user = ${updated_user},
            status = ${status},
            updated_at = NOW()
        WHERE id = ${idAsNumber}
      `
        return result
    } catch (error) {
        console.error('Failed to update user:', error);
        throw error;
    }
}

export const deleteUsr = async(id:string)=>{
    try {
        const idAsNumber = Number(id);
        const result = await prisma.$executeRaw`
        Update "users" set status='I' WHERE id=${idAsNumber}
        `
        return result
    } catch (error) {
        console.error('Failed to update user:', error);
        throw error;
    }
    
}