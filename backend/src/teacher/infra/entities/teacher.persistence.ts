import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { FacultyPersistence } from '../../../faculty/infra/entities/faculty.persistence';

@Entity('teacher')
@Index(['id'], { unique: true })
export class TeacherPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'text' })
  email: string;

  @ManyToMany(
    () => FacultyPersistence,
    f => f.teachers,
    { cascade: ['update'] },
  )
  @JoinTable()
  faculties: FacultyPersistence[] | any;
}