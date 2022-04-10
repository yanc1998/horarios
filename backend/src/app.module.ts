import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { UniversityModule } from './university/university.module';
import { DataAccessModule } from './shared/modules/data-access/data-access.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TeacherModule, UniversityModule, DataAccessModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}