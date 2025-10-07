import { FC } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { useForm } from '../../services/hooks/useForm';
import { loginUser } from '../../services/slices/user/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: values.email, password: values.password }));
  };

  return (
    <LoginUI
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errorText=''
    />
  );
};
