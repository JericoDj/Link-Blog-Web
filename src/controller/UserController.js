const API_URL = "https://link-api-r0b6.onrender.com/users";


export default class UserController {
  // Login user
  static async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Login response data:", data);
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      if (!data.access) {
        throw new Error("Login failed, no token received");
      }
      console.log("Token received:", data.access);
      return data.access;
    } catch (error) {
      throw error.message ? error : { message: "Login failed" };
    }
  }

  static async GoogleLogin(email, password) {
    try {
      const response = await fetch(`${API_URL}/googleLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Google login failed");
      }
      return data.access;
    } catch (error) {
      throw new Error(error.message || "Google login failed");
    }
  }

  // Register user
  static async register(userData) {
    console.log("userData", userData);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          mobileNo: userData.mobile,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Ensure message is structured
        const errorMessage = responseData.message || "Registration failed";
        throw new Error(errorMessage);
      }

      return responseData;
    } catch (error) {
      // If backend throws a message
      throw new Error(error.message || "Registration failed");
    }
  }

  // Forgot password
  static async forgotPassword(email) {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      return await response.json();
    } catch (error) {
      throw error.message ? error : { message: "Request failed" };
    }
  }

  static async getUserDetails(token) {
  const res = await fetch(`${API_URL}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user details");

  return await res.json(); // ✅ return plain object
}
}
