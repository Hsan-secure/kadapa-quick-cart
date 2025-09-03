import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unit: string;
  price: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  area: string;
  pincode: string;
  city: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  gst: number;
  total: number;
  address: Address;
  payment: {
    method: 'COD' | 'PhonePe';
    ref?: string;
  };
  status: 'PLACED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'ARRIVING' | 'DELIVERED' | 'CANCELLED';
  etaMinutes: number;
  createdAt: string;
  statusUpdates: {
    status: string;
    timestamp: string;
  }[];
}

interface CartState {
  items: CartItem[];
  addresses: Address[];
  orders: Order[];
  appliedCoupon: string | null;
  discount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; unit?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_COUPON' }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status']; timestamp: string } }
  | { type: 'LOAD_STATE'; payload: CartState };

const initialState: CartState = {
  items: [],
  addresses: [],
  orders: [],
  appliedCoupon: null,
  discount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, unit = product.unit } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id && item.unit === unit);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id && item.unit === unit
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: product.id,
            product,
            quantity,
            unit,
            price: product.price,
          },
        ],
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        appliedCoupon: null,
        discount: 0,
      };
    
    case 'APPLY_COUPON':
      return {
        ...state,
        appliedCoupon: action.payload.code,
        discount: action.payload.discount,
      };
    
    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null,
        discount: 0,
      };
    
    case 'ADD_ADDRESS':
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? {
                ...order,
                status: action.payload.status,
                statusUpdates: [
                  ...order.statusUpdates,
                  { status: action.payload.status, timestamp: action.payload.timestamp }
                ]
              }
            : order
        ),
      };
    
    case 'LOAD_STATE':
      return action.payload;
    
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product, quantity?: number, unit?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  addAddress: (address: Address) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'statusUpdates'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getCartTotal: () => { subtotal: number; discount: number; deliveryFee: number; gst: number; total: number };
  getItemCount: () => number;
}>({
  state: initialState,
  dispatch: () => {},
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  applyCoupon: () => {},
  removeCoupon: () => {},
  addAddress: () => {},
  createOrder: () => ({} as Order),
  updateOrderStatus: () => {},
  getCartTotal: () => ({ subtotal: 0, discount: 0, deliveryFee: 0, gst: 0, total: 0 }),
  getItemCount: () => 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('quickDeliveryCart');
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load cart state:', error);
      }
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('quickDeliveryCart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity = 1, unit?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, unit } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyCoupon = (code: string, discount: number) => {
    dispatch({ type: 'APPLY_COUPON', payload: { code, discount } });
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const addAddress = (address: Address) => {
    dispatch({ type: 'ADD_ADDRESS', payload: address });
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'statusUpdates'>): Order => {
    const order: Order = {
      ...orderData,
      id: `QD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      statusUpdates: [
        { status: 'PLACED', timestamp: new Date().toISOString() }
      ]
    };
    
    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    
    return order;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status, timestamp: new Date().toISOString() }
    });
  };

  const getCartTotal = () => {
    const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = state.discount;
    const discountedSubtotal = subtotal - discount;
    const deliveryFee = discountedSubtotal < 399 ? 15 : 0;
    const gst = Math.round((discountedSubtotal + deliveryFee) * 0.05);
    const total = discountedSubtotal + deliveryFee + gst;
    
    return { subtotal, discount, deliveryFee, gst, total };
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        addAddress,
        createOrder,
        updateOrderStatus,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};