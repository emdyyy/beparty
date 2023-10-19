import { google } from "googleapis";
import credentials from "./credentials.json";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "node:stream";

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const FOLDER_ID = "1xb-S25HVIzbzN4b1VLugYkKyLXBjLmjI";

const drive = google.drive({ version: "v3", auth });

const getFile = (fileId: string) => {
  return new Promise<{ imageUrl: string; imageData: string }>(
    (resolve, reject) => {
      drive.files.get(
        {
          fileId: fileId,
          alt: "media",
        },
        { responseType: "stream" },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            const bufs: any = [];
            res?.data
              .on("data", function (d) {
                bufs.push(d);
              })
              .on("end", function () {
                return resolve({
                  imageUrl: uuidv4(),
                  imageData: Buffer.concat(bufs).toString("base64"),
                });
              })
              .on("error", function (err) {
                return reject(err);
              });
          }
        }
      );
    }
  );
};

export const downloadImages = async () => {
  const { data } = await drive.files.list({
    orderBy: "createdTime desc",
    pageSize: 3,
    q: `'${FOLDER_ID}' in parents and trashed = false`,
  });

  if (!data.files) return;
  const images: { imageUrl: string; imageData: string }[] = [];
  for (const file of data.files) {
    if (!file.id) return;
    const image = await getFile(file.id);
    images.push(image);
  }
  return images;
};

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
