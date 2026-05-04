*** Settings ***
Library          SeleniumLibrary
Documentation    Updated Keyword-driven test for Blog App with Username field.

*** Variables ***
${URL}               http://localhost:3000
${BROWSER}           Chrome
${REG_URL}           ${URL}/register
${LOGIN_URL}         ${URL}/login

# Тестові дані
${USER_NAME}         MaksymDeveloper
${USER_EMAIL}        test@example.com
${USER_PASS}         password123

# Локатори (оновлено згідно з вашою формою)
${NAME_FIELD}        name=username
${EMAIL_FIELD}       name=email
${PASS_FIELD}        name=password
${REG_BTN}           xpath=//button[text()='Register']
${LOGIN_BTN}         xpath=//button[text()='Login']

*** Test Cases ***
Successful Registration and Login
    Register New User
    Login To Blog App
    Verify Home Page Reached
    [Teardown]    Close Browser

*** Keywords ***
Register New User
    Open Browser    ${REG_URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    ${NAME_FIELD}    timeout=10s
    # Заповнюємо ім'я користувача, щоб прибрати помилку валідації
    Input Text        ${NAME_FIELD}     ${USER_NAME}
    Input Text        ${EMAIL_FIELD}    ${USER_EMAIL}
    Input Password    ${PASS_FIELD}     ${USER_PASS}
    Click Button      ${REG_BTN}
    Wait Until Location Is    ${LOGIN_URL}    timeout=10s

Login To Blog App
    # На сторінці логіну зазвичай потрібні лише пошта та пароль
    Wait Until Element Is Visible    ${EMAIL_FIELD}    timeout=10s
    Input Text        ${EMAIL_FIELD}    ${USER_EMAIL}
    Input Password    ${PASS_FIELD}     ${USER_PASS}
    Click Button      ${LOGIN_BTN}

Verify Home Page Reached
    # Чекаємо на заголовок "Posts", який ми бачимо на головній сторінці
    Wait Until Page Contains    Posts    timeout=10s
    # Перевіряємо, що ми перейшли саме на сторінку /posts
    Location Should Be          ${URL}/posts
    # Додаткова перевірка наявності навігації для авторизованих користувачів
    Page Should Contain         Logout
    Page Should Contain         Create Post