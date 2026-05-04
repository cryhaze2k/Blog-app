*** Settings ***
Library          SeleniumLibrary
Documentation    Keyword-driven test for Blog App (Registration & Login)
...              Prepared by: Frolov M. V. (Group IN.m-51n)

*** Variables ***
# Параметри середовища
${URL}               http://localhost:3000
${BROWSER}           Chrome
${REG_URL}           ${URL}/register
${LOGIN_URL}         ${URL}/login

# Тестові дані
${USER_NAME}         Maksym_SumDU
${USER_EMAIL}        test_frolov@example.com
${USER_PASS}         Password123!

# Локатори (винесені в Variables згідно з Best Practices)
${NAME_FIELD}        name=username
${EMAIL_FIELD}       name=email
${PASS_FIELD}        name=password
${REG_BTN}           xpath=//button[text()='Register']
${LOGIN_BTN}         xpath=//button[text()='Login']

*** Test Cases ***
Successful Registration and Login Scenario
    [Documentation]    Test full cycle: Create user -> Login -> Verify Dashboard
    Register New User
    Login To Blog App
    Verify Home Page Reached
    [Teardown]    Close Browser

*** Keywords ***
Register New User
    Open Browser    ${REG_URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    ${NAME_FIELD}    timeout=10s
    # Заповнення всіх полів форми реєстрації
    Input Text        ${NAME_FIELD}     ${USER_NAME}
    Input Text        ${EMAIL_FIELD}    ${USER_EMAIL}
    Input Password    ${PASS_FIELD}     ${USER_PASS}
    Click Button      ${REG_BTN}
    # Очікуємо перенаправлення на сторінку входу після успішної реєстрації
    Wait Until Location Is    ${LOGIN_URL}    timeout=10s

Login To Blog App
    Wait Until Element Is Visible    ${EMAIL_FIELD}    timeout=10s
    Input Text        ${EMAIL_FIELD}    ${USER_EMAIL}
    Input Password    ${PASS_FIELD}     ${USER_PASS}
    Click Button      ${LOGIN_BTN}

Verify Home Page Reached
    # Перевірка успішного входу за наявністю тексту "Posts" та кнопки "Logout"
    Wait Until Page Contains    Posts     timeout=10s
    Page Should Contain         Logout
    # Перевірка, що додаток перенаправив на /posts
    Location Should Be          ${URL}/posts