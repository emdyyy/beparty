import { google } from "googleapis";
import { Readable } from "node:stream";
import credentials from "./credentials.json";

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const FOLDER_ID = "1xb-S25HVIzbzN4b1VLugYkKyLXBjLmjI";

export const uploadFile = async (file: File) => {
  const drive = google.drive({ version: "v3", auth });
  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    return await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [FOLDER_ID],
        mimeType: "image/jpeg",
      },
      media: {
        mimeType: "image/jpeg",
        body: Readable.from(buffer),
      },
      fields: "id",
    });
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
