import { connectToDatabase, client } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: any) {
    await connectToDatabase();
    const db = client.db("metronox");
    const collection = db.collection("patterns");
      const response = await collection.find({owner: context.params.username}).toArray();
      return new Response(JSON.stringify(response));
  }

export async function DELETE(request: NextRequest, context: any) {
  try {
    const data = await request.json();
    await connectToDatabase();
    const db = client.db("metronox");
    const collection = db.collection("patterns");
      const response = await collection.deleteOne({_id: new ObjectId(data.id), owner: context.params.username});
      return new Response(JSON.stringify(response));
  } catch (e) {
    console.error(e);
  }

  }