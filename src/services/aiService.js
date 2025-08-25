import AsyncStorage from '@react-native-async-storage/async-storage';

class AIService {
  constructor() {
    this.baseURL = 'https://aichatappbackend-production.up.railway.app/chat';
  }

  getFallbackResponse() {
    const responses = [
      "I'm experiencing some technical difficulties right now. Please try again in a moment!",
      "My servers seem to be busy. I'll get back to you as soon as I can.",
      "Oops, something went wrong on my end. Sorry about that!",
      "I can't reach my service at the moment. Let's try again shortly."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async sendMessage(message) {
    const apiKey = await AsyncStorage.getItem('apiKey');

    if (!apiKey) {
      throw new Error('API key not found. Please configure your API key in Settings.');
    }

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ message: message }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.response || data.message || 'No response from AI';
      } else {
        const status = response.status;
        
        if (status >= 500 && status < 600) {
          return this.getFallbackResponse();
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || errorData.message || `HTTP error! status: ${status}`);
        }
      }
    } catch (error) {
      if (error.message.includes('401')) {
        throw new Error('Invalid API key. Please check your API key in Settings.');
      } else if (error.message.includes('403')) {
        throw new Error('Access denied. Please check your API key permissions.');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
        return this.getFallbackResponse();
      } else {
        throw new Error(`Failed to get AI response: ${error.message}`);
      }
    }
  }
}

export default new AIService();