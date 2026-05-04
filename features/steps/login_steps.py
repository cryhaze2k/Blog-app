from behave import given, when, then

@given('I open the login page')
def step_impl(context):
    context.driver.get("http://localhost:3000/login")

@when('I enter valid email "{email}" and password "{password}"')
def step_impl(context, email, password):
    context.login_page.type(context.login_page.EMAIL_INPUT, email, "email")
    context.login_page.type(context.login_page.PASS_INPUT, password, "password")

@when('I click the login button')
def step_impl(context):
    context.login_page.click(context.login_page.LOGIN_BTN, "login")

@then('I should be redirected to the posts page')
def step_impl(context):
    assert "posts" in context.driver.current_url

@then('I should see the logout button')
def step_impl(context):
    assert context.driver.find_element(*context.login_page.LOGOUT_BUTTON).is_displayed()