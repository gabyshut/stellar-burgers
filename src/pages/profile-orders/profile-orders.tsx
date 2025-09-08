import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  clearOrders,
  fetchUserOrders
} from '../../services/slices/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersSlice.orders);

  useEffect(() => {
    dispatch(clearOrders());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
