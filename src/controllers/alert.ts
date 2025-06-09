import { Request, Response } from "express";
import * as model from "../models/alert";
import { generateAlibiID } from "../utils/tools";

export const listAlibi = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const list = await model.listAlibi();
    res.status(200).json(list); // ❌ No need to return
  } catch (error) {
    console.error("Error listing alibi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const insertAlibi = async(
    req: Request,
  res: Response
) => {
    try {
        const {
            name,
            created_by, 
            updated_by
        } = req.body

        const alibicode = await generateAlibiID()
        const result = await model.insertAlibi(
            alibicode,
            name,
            created_by, 
            updated_by
        )
        res.status(200).json({
            success: true,
            message: 'Success Add Alibi',
            data: result
        })
    } catch (error : any) {
        console.error('Insert failed:', error);
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        })
    }
}

export const updateAlibi = async(
  req: Request,
  res: Response
) => {
  try {
    const {
      id,
      name,
      updated_by
  } = req.body
  const alibi = await model.updateAlibiAlert(
    id,
      name,
      updated_by
  )
  res.status(200).json({
    success: true,
    message: 'Success Update Alibi',
    data: alibi
})
  } catch (error : any) {
    console.error('Insert failed:', error);
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        })
  }
}

export const deleteAlibi = async(
  req: Request,
  res: Response
) => {
  try {
    const {
      id,
      updated_by
  } = req.body
  const alibi = await model.deleteAlibiAlert(
    id,
      updated_by
  )
  res.status(200).json({
    success: true,
    message: 'Success Delete Alibi',
    data: alibi
})
  } catch (error : any) {
    console.error('Insert failed:', error);
        res.status(500).json({
            success: false,
            message: 'Error Fetch Insert',
            error: error.message
        })
  }
}

export const listAlertType = async(
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const list = await model.listAlertType();
    res.status(200).json(list); // ❌ No need to return
  } catch (error) {
    console.error("Error listing alibi:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const insertAlertType = async(
  req: Request,
  res: Response
) => {
  try {
    const {
      type_name,
      created_by,
      updated_by
    } = req.body

    const alertType = await model.insertAlertType(
      type_name,
      created_by,
      updated_by
    )
    res.status(200).json({
      success: true,
      message: 'Success Insert Alert type',
      data: alertType
  })
  } catch (error: any) {
    console.error('Insert failed:', error);
    res.status(500).json({
        success: false,
        message: 'Error Fetch Insert',
        error: error.message
    })
  }
}

export const updateAlertType = async(
  req: Request,
  res: Response
) => {
  try {
    const {
      type_id,
      type_name,
      updated_by
    } = req.body

    const alertType = await model.updateAlertType(
      type_id,
      type_name,
      updated_by
    )
    res.status(200).json({
      success: true,
      message: 'Success Update Alert type',
      data: alertType
  })
  } catch (error: any) {
    console.error('Insert failed:', error);
    res.status(500).json({
        success: false,
        message: 'Error Fetch Insert',
        error: error.message
    })
  }
}

export const deleteAlertType = async(
  req: Request,
  res: Response
) => {
  try {
    const {
      type_id,
      updated_by
    } = req.body

    const alertType = await model.deleteAlertType(
      type_id,
      updated_by
    )
    res.status(200).json({
      success: true,
      message: 'Success Delete Alert type',
      data: alertType
  })
  } catch (error: any) {
    console.error('Insert failed:', error);
    res.status(500).json({
        success: false,
        message: 'Error Fetch Insert',
        error: error.message
    })
  }
}