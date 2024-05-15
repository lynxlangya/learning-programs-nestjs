import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { UserModel } from '../src/prisma/models/user.prisma';
import { PostModel } from '../src/prisma/models/post.prisma';

const schema = `
// ⚠️ Prisma Schema
// This is an auto-generated schema file. [自动生成的 schema 文件]
// Do not modify this file manually. [不要手动修改这个文件]

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

${UserModel}

${PostModel}
`;

// 先删除 prisma/__schema.prisma 文件
execSync('rm -rf prisma/__schema.prisma');

// 将 schema 写入到 prisma/__schema.prisma 文件中
writeFileSync('prisma/__schema.prisma', schema);

// 写入完成之后，格式化文件
execSync('npx prisma format --schema=./prisma/__schema.prisma');

// overwrite schema.prisma
console.log('schema.prisma has been generated');
