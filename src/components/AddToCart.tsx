import React from 'react'
import {useDispatch, CartItem} from './AppState'

export interface AddToCartProps {
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
}

export function withAddTocart<OriginalProps extends AddToCartProps>(ChildComponent: React.ComponentType<OriginalProps>) {
    const AddToCartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {
        const dispatch = useDispatch()
        const handleAddToCartClick: AddToCartProps['addToCart'] = (item) => {
            dispatch({
                type: 'ADD_TO_CART',
                payload: {
                    item
                }
            })
        }
        return <ChildComponent {...props as OriginalProps} addToCart={handleAddToCartClick} />
    }

    return AddToCartHOC
}

export const useAddToCart = () => {
    const dispatch = useDispatch()
    const handleAddToCartClick: AddToCartProps['addToCart'] = (item) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                item
            }
        })
    }
    return handleAddToCartClick
}