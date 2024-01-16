import fs from "fs"
import path from "path"

const handler = (req, res) => {
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

        const filePath = path.join(process.cwd(), "data", "comments.json")
        const fileData = fs.readFileSync(filePath)
        const commentData = JSON.parse(fileData)
        commentData.push(newComment)
        fs.writeFileSync(filePath, JSON.stringify(commentData))

        res.status(201).json({ message: "Message add succsesfully!", comment: newComment })
    } else {
        res.status(200).json({ message: "DYNAMIC COMMENTS API WORKS!" })
    }
}

export default handler
