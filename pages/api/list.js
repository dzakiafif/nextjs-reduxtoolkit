import Cors from "cors";
import axios from "axios";
import initMiddleware from "../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res)
{
    await cors(req, res);

    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/test`);
    
    res.status(200).json(data.data);
}
