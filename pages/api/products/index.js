import { connectToDatabase } from "../_utils/mongoConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_req, res) => {
  try {
    const { db } = await connectToDatabase();
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
