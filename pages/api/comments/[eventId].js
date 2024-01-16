import { MongoClient } from "mongodb"

async function handler(req, res) {
    if (req.method === "GET") {
        const eventId = req.query.eventId

        const filePath = path.join(process.cwd(), "data", "comments.json")
        const fileData = fs.readFileSync(filePath)
        const commentData = JSON.parse(fileData)

        const selectedComments = []
        commentData.find(comment => {
            if (comment.eventId == eventId) {
                selectedComments.push(comment)
            }
        })

        res.status(200).json({ selectedComments })
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

        const client = await MongoClient.connect("mongodb+srv://chub7na:styJaqpfe6DNKT2q@cluster0.lauhirt.mongodb.net/?retryWrites=true&w=majority")
        const db = client.db()
        await db.collection("comments").insertOne(newComment)
        res.status(201).json({ message: "Message add succsesfully!", comment: newComment })

        client.close()
    } else {
        res.status(200).json({ message: "IT IS THE REQUEST WHICH IS NOT DEFINED YET" })
    }
}

export default handler
