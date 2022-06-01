import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    const endpoint = process.env.ENDPOINT || "http://localhost:8080";
    const params = {
      method: "POST",
      body: req.body,
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(endpoint, params);
    const data = await response.json();
    res.status(200).json({ msg: "Success", result: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}
