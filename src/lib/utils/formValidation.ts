export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 8
  }
  
  export const validateName = (name: string): boolean => {
    return name.trim().length > 0
  }
  
  export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone)
  }
  
  