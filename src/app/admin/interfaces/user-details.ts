import { Review } from '../../../interfaces/review';
import { User } from '../../../interfaces/user';
import { Ban } from './ban';

export interface UserDetails {
  user: User;
  reviews: Review[];
  ban: Ban[];
}
