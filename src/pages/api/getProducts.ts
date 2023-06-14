import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while proxying the request." });
  }
}
