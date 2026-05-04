import pytest
from selenium import webdriver
from pages.login_page import LoginPage

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

def test_successful_login(driver):
    login_page = LoginPage(driver)
    driver.get("http://localhost:3000/login")
    
    login_page.login("test@example.com", "password123")
    
    assert "posts" in driver.current_url
    login_page.make_screenshot("final_success")