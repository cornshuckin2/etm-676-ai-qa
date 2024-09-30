**_NOTE:_** We are using the SauceLabs swag labs free testing service to test. We will add tests as if we are iterating on new features. 

## Introduction
Swag Labs is a web application to shop for various products. 

## Scope

### Authentication
- User can login.
- User cannot login when they are locked out. 

## Testing

### Authentication
- Login credentials are found on the swag labs main page, and can be used to test various scenarios.
- Successful login should take the user to the products page.
- The locked out user should be shown an error and remain on the same screen.

## Risks 
- Lower priority features may not have enough time to be automated. 