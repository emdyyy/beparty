import { google } from "googleapis";
import credentials from "./credentials.json";
import { v4 as uuidv4 } from "uuid";

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
