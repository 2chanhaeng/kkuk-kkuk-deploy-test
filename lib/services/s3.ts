import { S3Client, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// TODO: 상수는 분리해서 별도 파일에서 관리
const REGION = process.env.AWS_REGION!;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!;
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;
const BASE_KEY = process.env.AWS_S3_BASE_KEY!;

export class S3Manager {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * S3에 있는 객체를 newKey로 복사합니다.
   *
   * @param targetKey 복사할 객체의 S3 key
   * @param newKey 복사된 객체의 S3 key
   */
  async copyObject(targetKey: string, newKey: string) {
    // TODO: 커맨드 생성 및 실행 함수 분리
    const copyCommand = new CopyObjectCommand({
      CopySource: `${BUCKET_NAME}/${targetKey}`,
      Bucket: BUCKET_NAME,
      Key: `${BASE_KEY}/${newKey}`,
    });
    try {
      await this.client.send(copyCommand);
    } catch (err) {
      // TODO: 에러 처리
      console.error('Error moving object:', err);
    }
  }

  /**
   * S3에 있는 객체를 이동합니다.
   *
   * @param targetKey 이동할 객체의 S3 key
   * @param destinationKey 객체가 이동될 목표 S3 key
   */
  async moveObject(targetKey: string, destinationKey: string): Promise<void> {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: targetKey,
    });

    try {
      await this.copyObject(targetKey, destinationKey);
      await this.client.send(deleteCommand);
    } catch (err) {
      console.error('Error moving object:', err);
    }
  }

  /**
   * 객체에 대한 Presigned URL을 생성
   *
   * @param fileName 유저가 올린 파일명
   * @param userId 유저 아이디
   * @returns S3 Presigned URL (60초간 유효)
   */
  async getPresignedUrl(fileName: string, userId: string): Promise<string> {
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${BASE_KEY}/${userId}/tmp/${fileName}`,
      ContentType: 'image/webp',
    });

    try {
      const url = await getSignedUrl(this.client, putCommand, { expiresIn: 60 });
      return url;
    } catch (err) {
      console.error('Error generating presigned URL:', err);
      throw err;
    }
  }

  extractS3Key(url: string): string {
    // URL 패턴을 정의합니다.
    const regex = /https:\/\/(?:[a-z0-9-]+\.)?s3\.[a-z0-9-]+\.amazonaws\.com\/([^?]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      console.error('Invalid S3 URL');
      throw new Error();
    }
  }
}
