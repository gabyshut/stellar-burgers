import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../services/selectors/user';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const userName = user?.name || '';

  return <AppHeaderUI userName={userName} />;
};
