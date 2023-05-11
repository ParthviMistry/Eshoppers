import sendgrid from "@sendgrid/mail";
import NextCors from "nextjs-cors";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case "POST": {
      try {
        const msg = {
          to: process.env.DEFAULT_TO_EMAIL,
          from: process.env.DEFAULT_FROM_EMAIL,
          subject: "New Order",
          html: `
          <div>
            <div>Hey!</div>
            <div>Here is your shopping list!</div>
            <br/>
            <div>
                ${req.body.map(
                  (i) =>
                    `<div>Your cart Id: ${i.id}</div>
                    <div>Product Name: ${i.name}</div>
                    <div>Product Price: ${i.price}</div>
                    <div>Product Quantity: ${i.quantity}</div>`
                )}
            </div>
          </div>
            `,
        };

        await sendgrid.send(msg);

        return res.status(200).json({ status: "Ok" });
      } catch (error) {
        console.log(error);
        return res
          .status(error.statusCode || 500)
          .json({ error: error.message });
      }
    }
  }
}
