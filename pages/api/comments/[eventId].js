import { MongoClient } from "mongodb"

async function handler(req, res) {
    const client = await MongoClient.connect("mongodb+srv://chub7na:styJaqpfe6DNKT2q@cluster0.lauhirt.mongodb.net/?retryWrites=true&w=majority")

    if (req.method === "GET") {
        const db = client.db()
        const documents = await db.collection("comments").find().sort({ _id: -1 }).toArray()

        res.status(200).json({ selectedComments: documents })
    } else if (req.method === "POST") {
        const email = req.body.email
        const name = req.body.name
        const text = req.body.text
        const eventId = req.body.eventId

        const newComment = {
            eventId: eventId,
            name: name,
            email: email,
            text: text
        }

        const db = client.db()
        await db.collection("comments").insertOne(newComment)

        res.status(201).json({ message: "Message add succsesfully!", comment: newComment })
    } else {
        res.status(200).json({ message: "IT IS THE REQUEST WHICH IS NOT DEFINED YET" })
    }

    client.close()
}

export default handler
