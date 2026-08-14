/**
 * Form Field & Input Validation Helpers
 * Udaan — Rural Education Platform
 */

/**
 * Validates Indian 10-digit mobile number
 */
export function validateMobile(mobile: string): { isValid: boolean; error?: string } {
  const cleaned = mobile.trim().replace(/\D/g, '');
  if (!cleaned) {
    return { isValid: false, error: 'Mobile number is required' };
  }
  if (cleaned.length !== 10) {
    return { isValid: false, error: 'Mobile number must be exactly 10 digits' };
  }
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return { isValid: false, error: 'Enter a valid Indian mobile number starting with 6-9' };
  }
  return { isValid: true };
}

export function isValidMobile(mobile: string): boolean {
  return validateMobile(mobile).isValid;
}

/**
 * Validates 4-digit numeric PIN
 */
export function validatePin(pin: string): { isValid: boolean; error?: string } {
  const cleaned = pin.trim();
  if (!cleaned) {
    return { isValid: false, error: '4-digit PIN is required' };
  }
  if (cleaned.length !== 4 || !/^\d{4}$/.test(cleaned)) {
    return { isValid: false, error: 'PIN must be exactly 4 digits' };
  }
  return { isValid: true };
}

export function isValidPin(pin: string): boolean {
  return validatePin(pin).isValid;
}

/**
 * Validates user full name
 */
export function validateName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Name is required' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  return { isValid: true };
}

export function isValidName(name: string): boolean {
  return validateName(name).isValid;
}

/**
 * Validates student grade
 */
export function validateGrade(grade: string): { isValid: boolean; error?: string } {
  if (!grade) {
    return { isValid: false, error: 'Grade selection is required' };
  }
  const validGrades = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  if (!validGrades.includes(grade)) {
    return { isValid: false, error: 'Please select a valid grade' };
  }
  return { isValid: true };
}
