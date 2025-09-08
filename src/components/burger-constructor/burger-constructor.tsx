import { FC, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks/hooks';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectUser } from '../../services/selectors/user';
import { useNavigate } from 'react-router-dom';
import { clearOrder, makeOrder } from '../../services/slices/orderCreateSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const { bun, ingredients } = useAppSelector(
    (state) => state.constructorSlice
  );

  const orderRequest = useAppSelector(
    (state) => state.orderCreateSlice.orderRequest
  );
  const orderModalData = useAppSelector(
    (state) => state.orderCreateSlice.orderData
  );

  const constructorItems = { bun, ingredients };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun) {
      alert('Выберите булку!');
      return;
    }

    if (orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    dispatch(makeOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
