import { uploadFile } from "@/services/DriveService";

export async function POST(request: Request) {
  const formData = await request.formData();
  if (!formData.get("image")) return;
  const file = formData.get("image") as File;

  uploadFile(file);
  return Response.json({});
}
