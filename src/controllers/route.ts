import { json } from "stream/consumers";
import * as model from "../models/route";
// import {getListVendor} from "../models/vendor"
import { sendMessageStatus, sendStatus } from "../utils/responseHelper";
import express from "express";
import { generateId } from "../utils/tools";

export const listRoute = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const route = await model.getListroute()

        res.json(route)
    } catch (error) {
        console.error("Error creating vendor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const dropDownRoute = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const list = await model.listRoute()
        res.status(200).json(list)
    } catch (error) {
        console.error("Error creating vendor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const listRouteByID = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const {routeid} = req.body
        const list = await model.getListRouteById(routeid)
        res.status(200).json(list);
    } catch (error) {
        console.error("Error creating vendor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// export const listVendorID = async(
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const {
//       id
//     } = req.params
//     const vendor = await model.getListVendorID(id)

//         res.json(vendor)
//   } catch (error) {
//     console.error("Error creating vendor:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
 

// }

export const createRoute = async (
    req: express.Request,
    res: express.Response
) => {
  try {
    const {
        routeID,
        routeName,
        routeSeq,
        gateway,
         floor,
         status,
          created_by,
          updated_by
    } = req.body;
    

    const result = await model.insertRoute(
        routeID,
        routeName,
        routeSeq,
        gateway,
         floor,
         status,
          created_by,
          updated_by
    );

    res.status(200).json({
        success: true,
        message: 'Success Add Gateway',
        data: result
    })
  } catch (error) {
    console.error("Error creating vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createRouteNew = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const {
            name,
            details,
            created_by,
            updated_by
        } = req.body

        const generateRouteID = await generateId()

        const result = await model.insertRouteNew(
            generateRouteID,
            name,
            details,
            created_by,
            updated_by
        )

        if (result.success) {
            return res.status(201).json(result);
          } else {
            return res.status(500).json(result);
          }

        
    } catch (error) {
        console.error("Error creating vendor:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// export const updateVendor = async(
//   req: express.Request,
//   res: express.Response
// )=>{
  
//   try {
//     const {
//       vendorName,
//       status,
//       updated_by,
//       id
//     } = req.body

//     const vendor = await model.updateVndr(
//       vendorName,
//       status,
//       updated_by,
//       id
//     )
//     if (vendor > 0) {
//       return res.status(200).json(sendStatus('Success Update Vendor'))
//     }else{
//       return res.status(400).json(sendStatus('Failed Update Vendor'))
//     }
//   } catch (error) {
//     console.error("Error creating vendor:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// export const delVendor = async (
//     req: express.Request,
//     res: express.Response
// ) => {
//   console.log('Received Headers:', req.headers);
//   console.log('Received Body:', req.body);
//     try {
//         const {
//             id
//         } = req.params
//         const {
//           updated_by
//         }= req.body
//         if (!id) {
//             return res.status(400).json({ message: "Missing user ID" });
//           }

//         const result = await model.deleteVndr(id,updated_by)
//         if (result > 0) {
//             return res.status(200).json(sendStatus("Success delete user"))
//         }else{
//             return res.status(400).json(sendStatus("Failed Delete User"))
        
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// }


