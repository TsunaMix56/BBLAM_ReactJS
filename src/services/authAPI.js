import { tokenService } from './tokenService';
import { mockAPI, isMockMode } from './mockAPI';
import { getAPIBaseURL } from '../config/apiConfig';

const API_BASE = getAPIBaseURL();

export const authAPI = {
  // Login API
  async login(username, password, role) {
    // Use mock API if in mock mode
    if (isMockMode()) {
      return await mockAPI.login(username, password, role);
    }

    try {
      console.log('🔐 Attempting login for:', username, 'with role:', role);
      const token = await tokenService.getValidToken();
      console.log('🎫 Using token:', token?.substring(0, 20) + '...');
      
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          role
        })
      });

      console.log('📡 Login response status:', response.status);
      
      const data = await response.json();
      console.log('✅ Login response:', data);
      
      // ตรวจสอบว่า response มี success หรือไม่
      if (data.success === false) {
        // API ส่ง error message กลับมา
        console.error('❌ Login failed:', data.error);
        return {
          success: false,
          error: data.error || 'Login failed'
        };
      }
      
      // Login สำเร็จ
      return data;
    } catch (error) {
      console.error('❌ Login error:', error.message);
      console.error('Full error:', error);
      
      // Provide more specific error message
      let errorMessage = 'Failed to connect to server';
      if (error.message.includes('fetch')) {
        errorMessage = 'ไม่สามารถเชื่อมต่อ API Server ได้ (กรุณาตรวจสอบว่า Server ทำงานอยู่)';
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  },

  // Create Account API
  async createAccount(username, password, role) {
    // Use mock API if in mock mode
    if (isMockMode()) {
      return await mockAPI.createAccount(username, password, role);
    }

    try {
      console.log('👤 Creating account for:', username, 'with role:', role);
      const token = await tokenService.getValidToken();
      console.log('🎫 Using token:', token?.substring(0, 20) + '...');
      
      const response = await fetch(`${API_BASE}/create-account`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          role
        })
      });

      console.log('📡 Create account response status:', response.status);
      
      const data = await response.json();
      console.log('✅ Create account response:', data);
      
      // ตรวจสอบว่า response มี success หรือไม่
      if (data.success === false) {
        // API ส่ง error message กลับมา
        console.error('❌ Create account failed:', data.error);
        return {
          success: false,
          error: data.error || 'Create account failed'
        };
      }
      
      // Create account สำเร็จ
      return data;
    } catch (error) {
      console.error('❌ Create account error:', error.message);
      console.error('Full error:', error);
      
      // Provide more specific error message
      let errorMessage = 'Failed to connect to server';
      if (error.message.includes('fetch')) {
        errorMessage = 'ไม่สามารถเชื่อมต่อ API Server ได้ (กรุณาตรวจสอบว่า Server ทำงานอยู่)';
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  }
};
