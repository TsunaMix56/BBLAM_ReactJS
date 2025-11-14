// Mock API for testing when real server is not available
const MOCK_MODE = false; // Set to false when real API is ready

const mockResponses = {
  token: {
    access_token: 'mock_token_12345',
    expires_in: 3600
  },
  login: {
    success: true,
    message: 'ยินดีต้อนรับเข้าสู่ระบบ BBLAM',
    Message: 'ยินดีต้อนรับเข้าสู่ระบบ BBLAM',
    role: 'admin'
  },
  createAccount: {
    success: true,
    message: 'สร้างบัญชีสำเร็จแล้ว',
    Message: 'สร้างบัญชีสำเร็จแล้ว'
  }
};

export const mockAPI = {
  async fetchToken() {
    console.log('🧪 MOCK: Fetching token');
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockResponses.token;
  },

  async login(username, password, role) {
    console.log('🧪 MOCK: Login', { username, role });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate success/failure
    if (username === 'test' && password === 'test') {
      return {
        success: false,
        error: 'Username หรือ Password ไม่ถูกต้อง'
      };
    }
    
    return {
      ...mockResponses.login,
      role: role
    };
  },

  async createAccount(username, password, role) {
    console.log('🧪 MOCK: Create account', { username, role });
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate duplicate username
    if (username === 'admin') {
      return {
        success: false,
        error: 'Username นี้มีอยู่ในระบบแล้ว'
      };
    }
    
    return mockResponses.createAccount;
  }
};

export const isMockMode = () => MOCK_MODE;
