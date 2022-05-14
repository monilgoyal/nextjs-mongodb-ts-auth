import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../../lib/users";
import { authenticateUser } from "../../web/tokens";
import defaultHandler from "../_defaultHandler";

const handler = defaultHandler<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    const user = await createUser(req.body);

    authenticateUser(res, user);
    res.json(user);
  }
);

export default handler;