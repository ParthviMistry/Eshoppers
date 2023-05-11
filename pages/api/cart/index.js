import { connectToDatabase } from "../_utils/mongoConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const cart = await db.collection("cart").find({}).toArray();
    res.json(cart);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
