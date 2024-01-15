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
    } else {
        res.status(200).json({ message: "DYNAMIC COMMENTS API WORKS!" })
    }
}

export default handler
