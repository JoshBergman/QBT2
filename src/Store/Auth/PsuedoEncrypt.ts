const encrypt = (text: string, shift: number): string => {
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letters
      encrypted += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letters
      encrypted += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      // Non-alphabetic characters
      encrypted += text.charAt(i);
    }
  }
  return encrypted;
};

const decrypt = (encryptedText: string, shift: number): string => {
  let decrypted = "";
  for (let i = 0; i < encryptedText.length; i++) {
    let charCode = encryptedText.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letters
      decrypted += String.fromCharCode(
        ((charCode - 65 - shift + 26) % 26) + 65
      );
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letters
      decrypted += String.fromCharCode(
        ((charCode - 97 - shift + 26) % 26) + 97
      );
    } else {
      // Non-alphabetic characters
      decrypted += encryptedText.charAt(i);
    }
  }
  return decrypted;
};

const pseudo = {
  encrypt,
  decrypt,
};

export default pseudo;
