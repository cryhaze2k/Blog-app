from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from tests.selenium_tests.pages.login_page import LoginPage

def before_scenario(context, scenario):
    options = webdriver.ChromeOptions()
    context.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    context.driver.maximize_window()
    context.login_page = LoginPage(context.driver)

def after_scenario(context, scenario):
    context.driver.quit()