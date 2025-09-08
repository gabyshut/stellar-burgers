import { FC, memo } from 'react';
import { useAppDispatch } from '../../services/hooks/hooks';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/constructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveUp = () => {
      if (index <= 0) return;
      dispatch(moveIngredient({ dragIndex: index, hoverIndex: index - 1 }));
    };

    const handleMoveDown = () => {
      if (index >= totalItems - 1) return;
      dispatch(moveIngredient({ dragIndex: index, hoverIndex: index + 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
