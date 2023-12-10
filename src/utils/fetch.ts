const API_URL = 'https://dolarapi.com/v1/dolares';

export default async () => {
    try {
        
        const response = await fetch(API_URL);
        const data = response.json();

        return Promise.resolve(data);
    } catch (error) {
        Promise.reject(error);
    }
}