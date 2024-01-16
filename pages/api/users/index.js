import { connectDatabase, insertDocument } from "../../../helpers/db-utils"

// Main function
async function handler(req, res) {
    // Initilize client for every request
    let client

    // Check which request is it
    if (req.method === "POST") {
        // Read the body
        const email = req.body.email

        // Create object to serve the incoming data
        const newUserEmail = { email: email }

        // Try to connect DB and store the data
        try {
            client = await connectDatabase()
        } catch (error) {
            res.status(500).json({ alertMessage: "Connecting to the database FAILED !", message: "Something went wrong! try again" })
            return
        }
        try {
            await insertDocument(client, "users", newUserEmail)
            client.close()
        } catch (error) {
            res.status(500).json({ message: "Inserting data FAILED !" })
            return
        }

        // If there's no error, send the response
        res.status(201).json({ user: newUserEmail, message: " registered succsesfully!", })
    } else {
        // Requests which is not defined yet, comes here
        res.status(200).json({ message: "ELSE STATEMENT; NOT DEFINED THAT REQUEST YET" })
    }
}

export default handler