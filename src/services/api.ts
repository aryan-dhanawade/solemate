
import { AuthResponse, Category, CheckoutData, LoginCredentials, Order, PaymentData, Product, RegisterData, User } from "@/types";

const API_URL = 'https://api.example.com'; // Replace with your actual API URL

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || `API error: ${response.status}`);
  }
  return response.json();
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

// Auth endpoints
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return handleResponse<AuthResponse>(response);
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  return handleResponse<AuthResponse>(response);
}

export async function getProfile(): Promise<User> {
  const response = await fetchWithAuth('/api/auth/profile');
  return handleResponse<User>(response);
}

// Category endpoints
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories`);
  return handleResponse<Category[]>(response);
}

// Product endpoints
export async function getProducts(categoryId?: number): Promise<Product[]> {
  const url = categoryId 
    ? `${API_URL}/api/products?category_id=${categoryId}` 
    : `${API_URL}/api/products`;
    
  const response = await fetch(url);
  return handleResponse<Product[]>(response);
}

export async function getProductById(productId: number): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${productId}`);
  return handleResponse<Product>(response);
}

// Order endpoints
export async function checkout(data: CheckoutData): Promise<Order> {
  const response = await fetchWithAuth('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  return handleResponse<Order>(response);
}

export async function getOrders(): Promise<Order[]> {
  const response = await fetchWithAuth('/api/orders');
  return handleResponse<Order[]>(response);
}

export async function getOrderById(orderId: number): Promise<Order> {
  const response = await fetchWithAuth(`/api/orders/${orderId}`);
  return handleResponse<Order>(response);
}

// Payment endpoints
export async function processPayment(paymentData: PaymentData) {
  const response = await fetchWithAuth('/api/payment', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  });
  
  return handleResponse(response);
}

export async function getPaymentByOrderId(orderId: number) {
  const response = await fetchWithAuth(`/api/payment/${orderId}`);
  return handleResponse(response);
}
