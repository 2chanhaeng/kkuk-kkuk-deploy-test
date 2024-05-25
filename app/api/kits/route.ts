import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const kits = await prisma.kit.findMany({});

  return NextResponse.json({ data: kits });
}

export async function POST(request: Request) {
  // TODO: auth, 필수 항목 미들웨어 구현
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return NextResponse.json({ error: '로그인 해주세요.' }, { status: 400 });

  const uploaderId = currentUser.id;
  const { title, description, imageUrls, thumbnailImage, rewardImage, tags } = await request.json();

  if (!title || !Array.isArray(imageUrls) || !thumbnailImage || !rewardImage || !uploaderId) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 });
  }

  const lastKit = await prisma.kit.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 1,
  });
  const lastId = parseInt(lastKit[0].id, 10);
  const newId = (lastId + 1).toString().padStart(7, '0');

  try {
    const kit = await prisma.kit.create({
      data: {
        id: newId,
        title,
        description,
        stamps: {
          create: imageUrls.map((url: string) => {
            return {
              image: url,
            };
          }),
        },
        rewardImage,
        thumbnailImage,
        tags,
        uploaderId,
      },
    });

    return NextResponse.json({ data: kit });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: '키트를 생성하지 못했습니다.' }, { status: 500 });
  }
}
