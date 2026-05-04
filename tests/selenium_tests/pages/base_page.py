import os
from datetime import datetime
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def make_screenshot(self, step_name):
        """Метод для створення скріншота після кожного кроку (вимога 10%)"""
        folder = "screenshots"
        if not os.path.exists(folder):
            os.makedirs(folder)
        
        timestamp = datetime.now().strftime("%H-%M-%S")
        file_path = f"{folder}/{step_name}_{timestamp}.png"
        self.driver.save_screenshot(file_path)
        print(f"Скріншот збережено: {file_path}")

    def find(self, locator):
        return self.wait.until(EC.presence_of_element_located(locator))

    def type(self, locator, text, step_name):
        el = self.find(locator)
        el.clear()
        el.send_keys(text)
        self.make_screenshot(f"type_{step_name}")

    def click(self, locator, step_name):
        self.find(locator).click()
        self.make_screenshot(f"click_{step_name}")