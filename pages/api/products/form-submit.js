import { connectToDatabase } from "../_utils/mongoConnect";
import { v4 as uuidv4 } from "uuid";
import NextCors from "nextjs-cors";
export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case "POST": {
      let { db } = await connectToDatabase();
      let {
        sku,
        id,
        name,
        image,
        description,
        inventory,
        text,
        price,
        available,
      } = req.body;
      if (!id) {
        id = uuidv4();
      }

      const product = await db.collection("products").findOneAndUpdate(
        { id },
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
          },
        },
        {
          upsert: true,
        }
      );

      return res.status(200).json({
        success: true,
        product,
      });
    }
    case "GET": {
      let { db } = await connectToDatabase();
      let { id, name } = req.query;
      let data;

      // if (!id) {
      //   return res.status(400).json({
      //     success: false,
      //     error: "No ID provided",
      //   });
      // }

      if (id) {
        data = await db.collection("products").findOne({ id: id });
      } else {
        data = await db.collection("products").findOne({
          name: { $regex: name, $options: "i" },
        });
      }

      // const data = await db.collection("products").findOne({
      //   $or: [{ id: id }, { name: { $regex: name, $options: "i" } }],
      // });

      return res.status(200).json({
        success: true,
        data,
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

      const deleted = await db.collection("products").deleteMany({ id });

      return res.status(200).json({
        success: true,
        deleted,
      });
    }
  }
}
