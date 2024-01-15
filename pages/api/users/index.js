import fs from "fs"
import path from "path"

const handler = (req, res) => {
    if (req.method === "POST") {
        const email = req.body.email

        const newUserEmail = { email: email, id: new Date().toISOString() }

        const filePath = path.join(process.cwd(), "data", "users.json")
        const fileData = fs.readFileSync(filePath)
        const data = JSON.parse(fileData)
        data.push(newUserEmail)
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(201).json({ message: "POST requested succsesfully!", user: newUserEmail })
    } else if (req.method === "GET") {
        const filePath = path.join(process.cwd(), "data", "users.json")
        const fileData = fs.readFileSync(filePath)
        const data = JSON.parse(fileData)

        res.status(200).json({ users: data })
    } else {
        res.status(200).json({ message: "ELSE STATEMENT; NOT DEFINED THAT REQUEST YET" })
    }
}

export default handler