import { connectToDatabase } from '../../util/mongodb'

const getTrans = async (req, res) => {
  const { db } = await connectToDatabase()

  const transactions = await db
    .collection('transactions')
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray()

  res.json(transactions)
}

export default getTrans
