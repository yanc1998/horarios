import { PropsBaseDto } from '../../../shared/core/PropsBaseDto';
import { BaseDto } from '../../../shared/core/BaseDto';

export type FacultyDto = PropsBaseDto & BaseDto & {
  universityId: string;
}
