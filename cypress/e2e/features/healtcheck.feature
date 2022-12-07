Feature: Verify that homa page elements are displayed when the site is loaded

    Feature Login page will work depending on the user credentials.

    
    Scenario: A user just created can access to the cart items
        Given I visit "www.demoblaze.com"
        Then The navigation bar is visible with options "Sign up" and "Log in"    
        When I click on Sign up option
        Then A user creation dialog form is displayed with fields "username", "password" and "Close", "Sign up" buttons on footer
        When I fill username, password and submit form
        Then The dialog is closed and I can Log in with the new user   
