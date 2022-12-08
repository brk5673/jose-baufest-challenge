Feature: User creation and cart workflow
     
    @demo
    Scenario: A user just created can access to the cart items
        Given I visit "https://www.demoblaze.com"
        Then The navigation bar is visible with options "Sign up" and "Log in"    
        When I click on Sign up option
        Then A user creation dialog form is displayed with fields "username", "password" and "Close", "Sign up" buttons on footer
        When I fill username, password and submit form
        Then The dialog is closed and I can Log in with the new user
        When I go to the "Laptops" section
        And I add to cart any laptop there
        Then The Laptop is visible on my cart
        When I click on Logout option on navbar
        Then My session is closed