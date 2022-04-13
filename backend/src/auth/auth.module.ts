import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './application/Strategies/localStrategy';
import { JwtStrategy } from './application/Strategies/jwtStrategy';
import { ValidateUserUseCase } from './application/useCase/auth.validate.use-case';
import { AuthController } from './controller/AuthController';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '../shared/modules/config/app-config.module';
import { AppConfigService } from '../shared/modules/config/service/app-config-service';
import { AuthUseCases } from './application/useCase';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.app.jwtSecret,
        signOptions: {
          expiresIn: configService.app.jwtExpiration,
        },
      }),

    }),
  ],
  controllers: [AuthController],
  providers: [
    ValidateUserUseCase,
    LocalStrategy,
    JwtStrategy,
    ...AuthUseCases,
  ],
})
export class AuthModule {
}
