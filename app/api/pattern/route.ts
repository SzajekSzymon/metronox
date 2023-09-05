import {client, connectToDatabase} from '../../../lib/mongo/index'

export async function GET(request: Request) {

  await connectToDatabase();
  const db = client.db('metronox');
  const collection = db.collection('patterns');
  const data = await collection.find({}).toArray();

  return new Response(JSON.stringify(data))
}

export async function POST(request: Request) {

  try {
    const data = await request.json()

    await connectToDatabase();
    const db = client.db('metronox');
    const collection = db.collection('patterns');
  
    collection.insertOne(data)
    return new Response(JSON.stringify({status: 200}))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }

}