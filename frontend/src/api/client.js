import axios from 'axios';

const productServiceUrl = process.env.REACT_APP_PRODUCT_SERVICE_URL || 'http://localhost:4001';
const orderServiceUrl = process.env.REACT_APP_ORDER_SERVICE_URL || 'http://localhost:4002';
const userServiceUrl = process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:4003';

const productApi = axios.create({ baseURL: productServiceUrl });
const orderApi = axios.create({ baseURL: orderServiceUrl });
const userApi = axios.create({ baseURL: userServiceUrl });

export const ProductAPI = {
  getAll: () => productApi.get('/products').then((res) => res.data.data),
  getById: (id) => productApi.get(`/products/${id}`).then((res) => res.data.data),
  create: (product) => productApi.post('/products', product).then((res) => res.data.data),
};

export const OrderAPI = {
  getAll: () => orderApi.get('/orders').then((res) => res.data.data),
  create: (order) => orderApi.post('/orders', order).then((res) => res.data.data),
};

export const UserAPI = {
  register: (payload) => userApi.post('/register', payload).then((res) => res.data.data),
  login: (payload) => userApi.post('/login', payload).then((res) => res.data.data),
};
