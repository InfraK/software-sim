import man1 from 'assets/avatars/man1.svg';
import man2 from 'assets/avatars/man2.svg';
import man3 from 'assets/avatars/man3.svg';
import man4 from 'assets/avatars/man4.svg';
import man5 from 'assets/avatars/man5.svg';
import man6 from 'assets/avatars/man6.svg';
import woman1 from 'assets/avatars/woman1.svg';
import woman2 from 'assets/avatars/woman2.svg';
import woman3 from 'assets/avatars/woman3.svg';
import woman4 from 'assets/avatars/woman4.svg';

export const mansAvatar = {
  man1,
  man2,
  man3,
  man4,
  man5,
  man6,
};

export const womansAvatar = {
  woman1,
  woman2,
  woman3,
  woman4,
};

export const avatars = {
  ...mansAvatar,
  ...womansAvatar,
};

export type AvatarKey = keyof typeof avatars;
