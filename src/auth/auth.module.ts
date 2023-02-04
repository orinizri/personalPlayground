import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
