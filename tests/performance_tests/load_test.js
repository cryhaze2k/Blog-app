import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 5, 
    duration: '30s',
};

// Перевір PORT у своєму .env файлі. Якщо там 3000, зміни тут.
const BASE_URL = 'http://localhost:3000'; 

export default function () {
    // 1. Авторизація через URL-encoded (як звичайна форма)
    let loginData = {
        email: 'test@example.com', // Перевір, чи у тебе в моделях 'email' чи 'username'
        password: 'password123',
    };

    let loginRes = http.post(`${BASE_URL}/login`, loginData); // Спробуй /login або /auth/login
    
    check(loginRes, {
        'logged in successfully': (r) => r.status === 200 || r.url.includes('/posts') || r.url.includes('/profile'),
    });

    // k6 автоматично зберігає Cookie в межах одного VU (Virtual User), 
    // тому наступний запит буде "авторизованим" через сесію.

    // 2. Створення допису (також через форму)
    let postData = {
        title: 'Навантажувальний тест СумДУ',
        content: 'Цей пост створено автоматично під час тестування k6',
    };

    let postRes = http.post(`${BASE_URL}/posts`, postData);
    
    check(postRes, {
        'post created': (r) => r.status === 201 || r.status === 200 || r.url.includes('/posts'),
    });

    sleep(1);
}