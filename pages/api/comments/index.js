import fs from "fs"
import path from "path"

const handler = (req, res) => {
    if (req.method === "GET") {
        const filePath = path.join(process.cwd(), "data", "comments.json")
        const fileData = fs.readFileSync(filePath)
        const data = JSON.parse(fileData)

        res.status(200).json({ comments: data })
    }
}

export default handler
