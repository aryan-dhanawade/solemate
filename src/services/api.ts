
import { AuthResponse, Category, CheckoutData, LoginCredentials, Order, PaymentData, Product, RegisterData, User } from "@/types";

<<<<<<< HEAD
// Changed from example.com to the actual server
const API_URL = 'http://localhost:5000/api'; // Adjust this to your actual Flask API URL
=======
const API_URL = 'https://api.example.com'; // Replace with your actual API URL
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)

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
<<<<<<< HEAD
  const response = await fetch(`${API_URL}/categories`);
=======
  const response = await fetch(`${API_URL}/api/categories`);
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)
  return handleResponse<Category[]>(response);
}

// Product endpoints
export async function getProducts(categoryId?: number): Promise<Product[]> {
  const url = categoryId 
<<<<<<< HEAD
    ? `${API_URL}/products?category_id=${categoryId}` 
    : `${API_URL}/products`;
=======
    ? `${API_URL}/api/products?category_id=${categoryId}` 
    : `${API_URL}/api/products`;
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)
    
  const response = await fetch(url);
  return handleResponse<Product[]>(response);
}

export async function getProductById(productId: number): Promise<Product> {
<<<<<<< HEAD
  const response = await fetch(`${API_URL}/products/${productId}`);
=======
  const response = await fetch(`${API_URL}/api/products/${productId}`);
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)
  return handleResponse<Product>(response);
}

// Order endpoints
export async function checkout(data: CheckoutData): Promise<Order> {
<<<<<<< HEAD
  const response = await fetchWithAuth('/checkout', {
=======
  const response = await fetchWithAuth('/api/checkout', {
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  return handleResponse<Order>(response);
}

export async function getOrders(): Promise<Order[]> {
<<<<<<< HEAD
  const response = await fetchWithAuth('/orders');
=======
  const response = await fetchWithAuth('/api/orders');
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)
  return handleResponse<Order[]>(response);
}

export async function getOrderById(orderId: number): Promise<Order> {
<<<<<<< HEAD
  const response = await fetchWithAuth(`/orders/${orderId}`);
=======
  const response = await fetchWithAuth(`/api/orders/${orderId}`);
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)
  return handleResponse<Order>(response);
}

// Payment endpoints
export async function processPayment(paymentData: PaymentData) {
<<<<<<< HEAD
  const response = await fetchWithAuth('/payment', {
=======
  const response = await fetchWithAuth('/api/payment', {
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)
    method: 'POST',
    body: JSON.stringify(paymentData),
  });
  
  return handleResponse(response);
}

export async function getPaymentByOrderId(orderId: number) {
<<<<<<< HEAD
  const response = await fetchWithAuth(`/payment/${orderId}`);
=======
  const response = await fetchWithAuth(`/api/payment/${orderId}`);
>>>>>>> parent of 71de21a (feat: Fetch data from API endpoints)
  return handleResponse(response);
}
