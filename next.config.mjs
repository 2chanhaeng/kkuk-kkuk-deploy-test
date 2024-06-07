/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        // 더미 이미지 서버
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        // 더미 이미지 서버
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        // TODO:  이미지 컴포넌트 수정 후 삭제
        protocol: 'https',
        hostname: 'kkuk-kkuk-stamp-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        // TODO: 환경변수화
        protocol: 'https',
        hostname: 'dnigeyw1tszed.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
