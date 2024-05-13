import {
  ArgumentMetadata,
  BadGatewayException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadGatewayException('No data submitted');
    }

    if (metadata.type === 'body') {
      if (!value.name) {
        throw new Error('Name is required');
      }
      if (!value.age) {
        throw new Error('Age is required');
      }
    }

    // 对数据进行转换，age + 10
    value.age = value.age + 10;

    return value;
  }
}
