import { google } from "googleapis";
import fs from "fs";

const auth = new google.auth.GoogleAuth({
  keyFile: process.cwd() + "/src/services/credentials.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const FOLDER_ID = "1xb-S25HVIzbzN4b1VLugYkKyLXBjLmjI";

export const uploadFile = async (file: File) => {
  const path = process.cwd() + "\\" + file.name;
  const drive = google.drive({ version: "v3", auth });
  try {
    const buffer = await file.arrayBuffer();
    fs.writeFile(path, new Uint8Array(buffer), (err) => {
      if (err) throw err;
    });

    const res = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [FOLDER_ID],
        mimeType: "image/jpeg",
      },
      media: {
        mimeType: "image/jpeg",
        body: fs.createReadStream(path),
      },
      fields: "id",
    });
  } catch (error: any) {
    return null;
  } finally {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
