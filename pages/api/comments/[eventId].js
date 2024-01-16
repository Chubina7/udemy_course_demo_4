import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-utils"

async function handler(req, res) {
    // Initilize client for every request
    let client
    // Try to connect database
    try {
        client = await connectDatabase()
    } catch (error) {
        res.status(500).json({ message: "Something went wrong; See console for details", consoleMessage: "Connecting to the database FAILED !" })
        return
    }

    // Checking which method is it
    if (req.method === "GET") {
        try {
            const documents = await getAllDocuments(client, "comments", { _id: -1 })

            // If everythins is OK, then send the data for FrontEnd
            res.status(200).json({ selectedComments: documents, message: "Comments got succsesfully!" })
            client.close()
        } catch (error) {
            res.status(500).json({ message: "Something went wrong; Check console for more info", consoleMessage: "Getting comments failed! Check the db-file-reding function" })
            client.close()
            return
        }
    } else if (req.method === "POST") {
        // Reading the request body
        const email = req.body.email
        const name = req.body.name
        const text = req.body.text
        const eventId = req.body.eventId

        // Creating new object to serve it in the DB
        const newComment = {
            eventId: eventId,
            name: name,
            email: email,
            text: text
        }

        // Try to insert data into DB
        try {
            await insertDocument(client, "comments", newComment)
        } catch (error) {
            res.status(500).json({ message: "Inserting comment FAILED! check db-file-inserting function", alertMessage: "Something went wrong! Check console for more" })
            client.close()
            return
        }

        // If everything is OK, send message
        res.status(201).json({ message: "Comment add succsesfully!", comment: newComment })
        client.close()
    } else {
        // If the request is not defined yet, it comes here
        res.status(200).json({ message: "IT IS THE REQUEST WHICH IS NOT DEFINED YET" })
        client.close()
    }

    client.close()
}

export default handler
