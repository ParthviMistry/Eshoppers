import { connectToDatabase } from "../_utils/mongoConnect";
import { v4 as uuidv4 } from "uuid";
import NextCors from "nextjs-cors";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const cookie = getCookie("userId", { req, res });

  switch (req.method) {
    case "POST": {
      let { db } = await connectToDatabase();
      let {
        sku,
        id,
        name,
        image,
        description,
        quantity,
        inventory,
        text,
        price,
        available,
        email,
        username,
      } = req.body;
      if (!id) {
        id = uuidv4();
      }

      const cart = await db.collection("cart").updateMany(
        { name },
        {
          $set: {
            price,
            description,
            sku,
            name,
            available,
            image,
            text,
            inventory,
            userId: cookie,
            username,
            email,
            quantity,
          },
        },
        {
          upsert: true,
        }
      );

      return res.status(200).json({
        success: true,
        cart,
      });
    }

    case "DELETE": {
      let { db } = await connectToDatabase();
      let { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: "No ID provided",
        });
      }

      const deleted = await db.collection("cart").deleteMany({ name: id });

      return res.status(200).json({
        success: true,
        deleted,
      });
    }
  }
}
