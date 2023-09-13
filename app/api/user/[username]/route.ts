import { connectToDatabase, client } from "@/lib/mongo";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: any) {
    await connectToDatabase();
    const db = client.db("metronox");
    const collection = db.collection("patterns");
    if(true) {
      const response = await collection.find({owner: context.params.username}).toArray();
      return new Response(JSON.stringify(response));
    }
  }