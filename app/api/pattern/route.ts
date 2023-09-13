import { ObjectId } from "mongodb";
import { client, connectToDatabase } from "../../../lib/mongo/index";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectToDatabase();
  const db = client.db("metronox");
  const collection = db.collection("patterns");
  if(true) {
    const response = await collection.find().toArray();
    return new Response(JSON.stringify(response));
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await connectToDatabase();
    const db = client.db("metronox");
    const collection = db.collection("patterns");

    collection.insertOne(data);
    return new Response(JSON.stringify({ status: 200 }));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    await connectToDatabase();
    const db = client.db("metronox");
    const collection = db.collection("patterns");

    collection.updateOne(
      { _id: new ObjectId(data._id) },
      {
        $set: {
          patterns: data.patterns,
          projectName: data.projectName,
          public: data.public,
        },
      }
    );
    return new Response(JSON.stringify({ status: 200 }));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();

    await connectToDatabase();
    const db = client.db("metronox");
    const collection = db.collection("patterns");

    data.pattern.patterns.splice(data.index, 1);

    collection.updateOne(
      { _id: new ObjectId(data.pattern._id) },
      { $set: { patterns: data.pattern.patterns } }
    );
    return new Response(JSON.stringify({ status: 200 }));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
