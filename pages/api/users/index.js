import { MongoClient } from "mongodb"

async function handler(req, res) {
    if (req.method === "POST") {
        const email = req.body.email
        const newUserEmail = { email: email }

        const client = await MongoClient.connect("mongodb+srv://chub7na:styJaqpfe6DNKT2q@cluster0.lauhirt.mongodb.net/?retryWrites=true&w=majority")
        const db = client.db()
        await db.collection("users").insertOne(newUserEmail)
        res.status(201).json({ message: "POST requested succsesfully!", user: newUserEmail })

        client.close()
    } else {
        res.status(200).json({ message: "ELSE STATEMENT; NOT DEFINED THAT REQUEST YET" })
    }
}

export default handler