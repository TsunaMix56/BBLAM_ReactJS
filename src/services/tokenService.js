import { mockAPI, isMockMode } from './mockAPI';
import { getTokenURL } from '../config/apiConfig';

// Token management service
const TOKEN_KEY = 'auth_token';
const EXPIRES_KEY = 'token_expires';

export const tokenService = {
  // Get token from API
  async fetchToken() {
    // Use mock API if in mock mode
    if (isMockMode()) {
      const data = await mockAPI.fetchToken();
      const expiresAt = Date.now() + (data.expires_in * 1000);
      localStorage.setItem(TOKEN_KEY, data.access_token);
      localStorage.setItem(EXPIRES_KEY, expiresAt.toString());
      return data.access_token;
    }

    const url = getTokenURL();
    const credentials = btoa('BBLAMTEST1:1234Bbl@m'); // Basic Auth
    
    try {
      console.log('🔑 Fetching token from:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Token response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Token fetch failed:', response.status, errorText);
        throw new Error(`Failed to fetch token: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Token received:', data);
      
      // ตรวจสอบว่า response มี success และ data
      if (data.success && data.data) {
        const tokenData = data.data;
        const accessToken = tokenData.access_token;
        const expiresIn = tokenData.expires_in;
        
        if (accessToken) {
          // คำนวณเวลาหมดอายุ
          let expiresAt;
          if (typeof expiresIn === 'string') {
            // ถ้าเป็น datetime string แปลงเป็น timestamp
            expiresAt = new Date(expiresIn).getTime();
          } else if (typeof expiresIn === 'number') {
            // ถ้าเป็นจำนวนวินาที
            expiresAt = Date.now() + (expiresIn * 1000);
          } else {
            // default 1 ชั่วโมง
            expiresAt = Date.now() + (3600 * 1000);
          }
          
          localStorage.setItem(TOKEN_KEY, accessToken);
          localStorage.setItem(EXPIRES_KEY, expiresAt.toString());
          console.log('💾 Token stored');
          console.log('   - Token:', accessToken.substring(0, 30) + '...');
          console.log('   - Expires at:', new Date(expiresAt).toLocaleString());
          console.log('   - User:', tokenData.user?.username);
          return accessToken;
        }
      }
      
      console.error('❌ Token response structure:', JSON.stringify(data, null, 2));
      throw new Error('Invalid token response - missing access_token field');
    } catch (error) {
      console.error('❌ Token fetch error:', error.message);
      console.error('Full error:', error);
      throw error;
    }
  },

  // Get valid token (fetch new if expired)
  async getValidToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresAt = localStorage.getItem(EXPIRES_KEY);

    // Check if token exists and is not expired
    if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
      return token;
    }

    // Token expired or doesn't exist, fetch new one
    return await this.fetchToken();
  },

  // Clear token
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
  }
};
