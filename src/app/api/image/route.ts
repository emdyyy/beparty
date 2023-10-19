import { downloadImages, uploadFile } from "@/services/DriveService";

export async function POST(request: Request) {
  const formData = await request.formData();
  if (!formData.get("image")) return;
  const file = formData.get("image") as File;

  const data = await uploadFile(file);
  if (data) {
    return Response.json({}, { status: data.status });
  }
  return Response.json({}, { status: 500 });
}

export async function GET(request: Request) {
  const images = await downloadImages();
  return Response.json(images, { status: 200 });
}
