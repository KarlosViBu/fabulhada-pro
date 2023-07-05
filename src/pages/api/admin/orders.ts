import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { db } from "../../../database";
import { Order } from "../../../models";
import { IOrder } from "../../../interfaces";

type Data = { message: string } | IOrder[];

export default function handler(  req: NextApiRequest,  res: NextApiResponse<Data>) {
  
  switch (req.method) {
    case "GET":
      return getOrders(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

   const validRoles = ['admin']
   const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
   // console.log({session});

   if (session && validRoles.includes(session.user.role)) {
      // console.log(session.user.role);
      await db.connect();
      const orders = await Order.find()
         .sort({ createdAt: "desc" })
         .populate("user", "name email")
         .lean();
      await db.disconnect();
      
      // console.log( orders );
      
      return res.status(200).json(orders);
   }
   else {
      return res.status(404).json({
         message: 'Desautorizado para estar aqui'
     })
  
   }
}
