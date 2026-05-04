from selenium.webdriver.common.by import By
from .base_page import BasePage

class LoginPage(BasePage):
    # Локатори винесені в окремі змінні (вимога щодо зміни елементів)
    EMAIL_INPUT = (By.NAME, "email")
    PASS_INPUT = (By.NAME, "password")
    LOGIN_BTN = (By.XPATH, "//button[text()='Login']")

    def login(self, email, password):
        self.type(self.EMAIL_INPUT, email, "email")
        self.type(self.PASS_INPUT, password, "password")
        self.click(self.LOGIN_BTN, "login_button")