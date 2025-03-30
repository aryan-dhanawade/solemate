
export interface User {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone: string;
  address: string;
}

export interface Category {
  category_id: number;
  name: string;
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  image_url?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  order_id: number;
  customer_id: number;
  order_date: string;
  status: string;
  total_amount: number;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  product?: Product;
}

export interface CheckoutData {
  items: {
    product_id: number;
    quantity: number;
  }[];
}

export interface PaymentData {
  order_id: number;
  payment_method: string;
  amount: number;
}
