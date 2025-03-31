
export interface User {
  id?: number;
  customer_id?: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  is_admin?: boolean; // Add isAdmin flag
}

export interface AuthResponse {
  access_token: string;
  user: User;
  is_admin: boolean;
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
  img_link?: string;
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
  customer_id: number;
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

export interface ContactUs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
}

export interface ContactIssue {
  contact_id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AdminData {
  customers: Customer[];
  orders: Order[];
  products: Product[];
  issues: ContactIssue[];
}
