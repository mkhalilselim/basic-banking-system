import { connectToDatabase } from '../../util/mongodb'

const postTransactions = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body

    const { client, db } = await connectToDatabase()

    const myCollection = db.collection('transactions')
    const result = await myCollection.insertOne(data)
    console.log(result)
    client.close()
    res.status(201).json({ message: 'Data inserted successfully!' })
  }
}

export default postTransactions
