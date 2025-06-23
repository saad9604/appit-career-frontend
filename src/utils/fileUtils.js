/**
 * Validates file type and size
 * 
 * @param {File} file - The file to validate
 * @param {Object} options - Validation options
 * @param {string[]} options.allowedTypes - Array of allowed MIME types
 * @param {number} options.maxSizeMB - Maximum file size in MB
 * @returns {Object} Validation result with isValid and message
 */
export const validateFile = (file, options = {}) => {
  const {
    allowedTypes = [
      // Images
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      // Documents
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/rtf',
      'text/plain',
      'application/vnd.oasis.opendocument.text'
    ],
    maxSizeMB = 5
  } = options;
  
  // Check if file exists
  if (!file) {
    return {
      isValid: false,
      message: "No file selected"
    };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: `Invalid file type. Please upload one of the following: ${allowedTypes.map(type => type.split('/')[1]).join(', ')}`
    };
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      message: `File size exceeds ${maxSizeMB}MB. Please upload a smaller file.`
    };
  }
  
  // All checks passed
  return {
    isValid: true,
    message: "File is valid"
  };
};

/**
 * Converts a file to base64 string
 * 
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Promise resolving to base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Gets a human-readable file size string
 * 
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Human-readable file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default {
  validateFile,
  fileToBase64,
  formatFileSize
};