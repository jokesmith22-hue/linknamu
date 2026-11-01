import { MongoClient, type Collection } from "mongodb";

type ClickDoc = { _id: string; count: number };

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 없으면 null을 반환해서, DB 없이도 페이지는 동작하게 합니다. */
export async function getClicksCollection(): Promise<Collection<ClickDoc> | null> {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  const client = await globalForMongo._mongoClientPromise;
  return client.db(process.env.MONGODB_DB ?? "linknamu").collection<ClickDoc>("clicks");
}

/** 링크별 클릭 수. DB가 없거나 오류가 나면 빈 객체. */
export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const col = await getClicksCollection();
    if (!col) return {};
    const docs = await col.find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (err) {
    console.error("클릭 수 조회 실패:", err);
    return {};
  }
}
