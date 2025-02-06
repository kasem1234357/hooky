import { useState, useMemo } from "react";

type ValidationType = 'userName' | 'email' | 'password' | 'custom';
type ValidationRules = Record<string, RegExp>;
type ErrorMessages = Record<string, string>;

interface ValidationConfig {
  rules?: ValidationRules;
  messages?: ErrorMessages;
  onSuccess?: () => void;
  onError?: () => void;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const DEFAULT_RULES: ValidationRules = {
  userName: /^[A-Za-z0-9]{3,16}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,20}$/,
};

const DEFAULT_MESSAGES: ErrorMessages = {
  userName: "Username should be 3-16 alphanumeric characters",
  email: "Please enter a valid email address",
  password: "Password must be 8-20 characters with at least 1 letter, 1 number, and 1 special character",
};

const useValidate = (config?: ValidationConfig) => {
  const [customRules, setCustomRules] = useState<ValidationRules>(config?.rules || {});
  const [customMessages, setCustomMessages] = useState<ErrorMessages>(config?.messages || {});
  
  const mergedRules = useMemo(() => ({
    ...DEFAULT_RULES,
    ...customRules
  }), [customRules]);

  const mergedMessages = useMemo(() => ({
    ...DEFAULT_MESSAGES,
    ...customMessages
  }), [customMessages]);

  const validate = (type: ValidationType | string, value: string): ValidationResult => {
    const regex = mergedRules[type];
    
    if (!regex) {
      return {
        isValid: false,
        error: `No validation rule found for type: ${type}`
      };
    }

    const isValid = regex.test(value);
    return {
      isValid,
      error: isValid ? undefined : mergedMessages[type] || `Invalid ${type}`
    };
  };
  const bulkValidate = (fields: Record<string, string>) => {
    let allValid = true;
    const validationResult = Object.entries(fields).reduce((acc, [fieldName, value]) => {
      const result = validate(fieldName, value);
      if (!result.isValid) {
     allValid = false;
      }
      return {
        ...acc,
        [fieldName]: result
      };
    }, {} as Record<string, ValidationResult>);
    allValid ? config?.onSuccess?.() : config?.onError?.();
    return validationResult;
  };

  const updateRules = (newRules: ValidationRules) => {
    if (Object.keys(newRules).length === 0) {
      console.warn("updateRules requires a non-empty object");
      return;
    }
    setCustomRules(prev => ({ ...prev, ...newRules }));
  };

  const updateMessages = (newMessages: ErrorMessages) => {
    if (Object.keys(newMessages).length === 0) {
      console.warn("updateMessages requires a non-empty object");
      return;
    }
    setCustomMessages(prev => ({ ...prev, ...newMessages }));
  };

  return {
    validate,
    bulkValidate,
    updateRules,
    updateMessages,
    getCurrentRules: () => mergedRules,
    getCurrentMessages: () => mergedMessages,
  };
};

export default useValidate;