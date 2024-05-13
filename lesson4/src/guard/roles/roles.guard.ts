import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // // Get the user from the request object [从请求对象中获取用户]
    const request = context.switchToHttp().getRequest();
    // Check if the user has the admin role [检查用户是否具有管理员角色]
    const user = request.user;

    // Return true if the user has the admin role [如果用户具有管理员角色，则返回true]
    return user?.roles?.includes('admin');

    // Mock the user object [模拟用户对象]
    // const user = this.usersService.findOne(1);
    // return user?.roles?.includes('admin');
  }
}
