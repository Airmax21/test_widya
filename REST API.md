# REST API Documentation

## Authentication

### Register User

Registrasi User ke sistem.

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "name": "Iqbal",
    "email": "iqbal.agyan@gmail.com",
    "gender": "laki",
    "password": "test2123"
  }
- **Success Response:**
  - **Status code : '201 created'**
  - **Body :**
  ```json
    {
    "message": "User created successfully",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "gender": "male"
    }
- **Error Response:**
  -  **Status code : '500 Internal Server Error'**
  -  **Body :**
    ```json
      {
        "message": "Internal Server Error"
      }


### Login User

Login User ke sistem.

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "secretpassword"
  }

- **Success Response:**
  - **Status code : '200 OK'**
  - **Body :**
    
  ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....",
    }

  
- **Error Response:**
  -  **Status code : '404 Not Found'**
  -  **Body :**
    
    ```json
      {
        "message": "User not found"
      }
    ```
    
  -  **Status code : '401 Unauthorized'**
  -  **Body :**
    
    ```json
      {
        "message": "Invalid password"
      }
    ```

  -  **Status code : '500 Internal Server Error'**
  -  **Body :**
    
    ```json
      {
        "message": "Internal Server Error"
      }
    ```
