import { connectToDatabase } from '../../util/mongodb'

const updateCustomer = async (req, res) => {
  if (req.method === 'PUT') {
    const data = req.body

    const { client, db } = await connectToDatabase()

    const myCollection = db.collection('customers')
    const result = await myCollection.updateOne(
      {
        email: data.email,
      },
      {
        $set: {
          balance: data.balance,
        },
      }
    )
    console.log(result)
    client.close()
    res.status(201).json({ message: 'Balance updated successfully!' })
  }
}

export default updateCustomer
