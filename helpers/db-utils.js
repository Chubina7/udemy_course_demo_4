import { MongoClient } from "mongodb"

// Connect to the DataBase
export async function connectDatabase() {
    const client = await MongoClient.connect("mongodb+srv://chub7na:styJaqpfe6DNKT2q@cluster0.lauhirt.mongodb.net/?retryWrites=true&w=majority")

    return client
}

// Insert a document into the DataBase
export async function insertDocument(client, collection, document) {
    const db = client.db()
    const result = await db.collection(collection).insertOne(document)

    return result
}

// Read full document from the DataBase
export async function getAllDocuments(client, collection, sort) {
    const db = client.db()
    const documents = await db.collection(collection).find().sort(sort).toArray()

    return documents
}