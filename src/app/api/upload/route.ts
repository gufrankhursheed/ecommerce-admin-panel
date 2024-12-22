import cloudinary from 'cloudinary';
import connect from '@/connection/mongoDB';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  await connect();

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const buffer = await streamToBuffer(file.stream());

    const base64Image = buffer.toString('base64');
    const uploadResult = await cloudinary.v2.uploader.upload(`data:${file.type};base64,${base64Image}`, {
      folder: 'ecommerce-app',
      public_id: `file_${Date.now()}`,
      resource_type: 'auto',
    });

    const link = uploadResult.secure_url;

    return NextResponse.json({ links: [link] });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({ error: 'Failed to upload' }, { status: 500 });
  }
};

// Helper function to convert ReadableStream to Buffer
const streamToBuffer = (stream: ReadableStream<Uint8Array>): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    const reader = stream.getReader();

    const processText = async (): Promise<void> => {
      try {
        const { done, value } = await reader.read();
        if (done) {
          resolve(Buffer.concat(chunks));
          return; 
        }
        chunks.push(value);
        await processText(); 
      } catch (error) {
        reject(error); 
      }
    };

    processText(); 
  });
};

