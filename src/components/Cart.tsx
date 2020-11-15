import React, { createRef } from 'react'
import CartCSS from './Cart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { AppStateContext } from './AppState'

interface Props {}

interface State{
    isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
    #containerRef: React.RefObject<HTMLDivElement>
    constructor(props: Props) {
        super(props)
        this.state = {
            isOpen: false
        }
        this.#containerRef = createRef()
    }

    handleOutsideClick = (e: MouseEvent) => {
        if(this.#containerRef.current && !this.#containerRef.current.contains(e.target as Node)) {
            this.setState({ isOpen: false })
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick)
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
    }

    render() {
        return (
            <AppStateContext.Consumer>
                {(state) => {
                    const itemToCount = state.cart.items.reduce((a, c) => {
                        return a + c.quantity
                    }, 0)
                    return (
                        <div className={CartCSS.cartContainer} ref={this.#containerRef}>
                            <button 
                                className={CartCSS.button}
                                type="button"
                                onClick={this.handleClick}
                            >
                                <FiShoppingCart />
                                <span>{itemToCount} Pizza(s)</span>
                            </button>
                            <div className={CartCSS.cartDropDown} style={{ display: this.state.isOpen ? 'block' : 'none' }}>
                                <ul>
                                    {state.cart.items.map(item => {
                                        return <li key={item.id}>{item.name} &times; {item.quantity}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                }}
            </AppStateContext.Consumer>
        )
    }
}

export default Cart