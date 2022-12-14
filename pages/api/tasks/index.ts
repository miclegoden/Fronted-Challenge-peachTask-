import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      // ? GET /api/tasks
      return res.status(200).send(
        await prisma.task.findMany({
          where: { isDone: false, isTrash: false }
        })
      )
    case 'POST':
      // ? POST /api/tasks
      return res.status(200).send(await prisma.task.create({ data: req.body }))
    default:
      return res.status(405).end()
  }
}

export default handler
