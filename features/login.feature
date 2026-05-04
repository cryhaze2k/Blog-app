Feature: Blog App Authentication
  As a registered user
  I want to log in to the system
  To manage my posts

  Scenario: Successful login with valid credentials
    Given I open the login page
    When I enter valid email "test@example.com" and password "password123"
    And I click the login button
    Then I should be redirected to the posts page
    And I should see the logout button