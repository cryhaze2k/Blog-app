import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from tests.selenium_tests.pages.login_page import LoginPage

@pytest.fixture
def driver():
    # Налаштування для Chrome
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless") # Розкоментуй для CI/CD (запуск без вікна)
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.maximize_window()
    yield driver
    driver.quit()

def test_blog_login_success(driver):
    login_page = LoginPage(driver)
    
    # Крок 1: Відкриваємо сторінку
    driver.get("http://localhost:3000/login")
    login_page.make_screenshot("open_login_page")
    
    # Крок 2: Авторизація (всі скріншоти всередині методу login)
    login_page.login("test@example.com", "password123")
    
    # Крок 3: Перевірка (Assertion)
    assert "posts" in driver.current_url
    login_page.make_screenshot("final_check")