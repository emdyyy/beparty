import { downloadImages } from "@/services/DownloadService";
import { uploadFile } from "@/services/UploadService";

export async function POST(request: Request) {
  const formData = await request.formData();
  if (!formData.get("image")) return;
  const file = formData.get("image") as File;

  const data = await uploadFile(file);
  if (data) {
    return Response.json({}, { status: 200 });
  }
  return Response.json({}, { status: 500 });
}
