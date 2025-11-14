// API Configuration
// เปลี่ยนค่านี้เพื่อเลือกวิธีเชื่อมต่อ API

// Mode 1: ใช้ Vite Proxy (สำหรับ development)
// Mode 2: เรียก API โดยตรง (ถ้า server รองรับ CORS)
export const API_MODE = 'DIRECT'; // 'PROXY' หรือ 'DIRECT'

// API Base URL configuration
export const getAPIBaseURL = () => {
  if (API_MODE === 'DIRECT') {
    return 'http://172.23.240.1:8000/api/auth';
  } else {
    // ใช้ relative path สำหรับ Vite proxy
    return '/api/auth';
  }
};

export const getTokenURL = () => {
  if (API_MODE === 'DIRECT') {
    return 'http://172.23.240.1:8000/api/auth/token';
  } else {
    return '/api/auth/token';
  }
};
