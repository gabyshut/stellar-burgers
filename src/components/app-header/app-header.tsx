import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/hooks/hooks';
import { selectUser } from '../../services/selectors/user';

export const AppHeader: FC = () => {
  const user = useAppSelector(selectUser);
  const userName = user?.name || '';

  return <AppHeaderUI userName={userName} />;
};
