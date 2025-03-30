
export interface User {
  customer_id?: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  message: string;
  user?: User;
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
  category_id?: number;
  category?: string;
  image_url?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  order_item_id?: number;
  product_id: number;
  quantity: number;
  price?: number;
  product?: Product;
}

export interface Order {
  order_id: number;
  customer_id?: number;
  order_date: string;
  status: string;
  total_amount: number;
  order_items?: OrderItem[];
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
