import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090");

export async function adminAuth(email: string, password: string) {
  await pb.admins.authWithPassword(email, password);
}
