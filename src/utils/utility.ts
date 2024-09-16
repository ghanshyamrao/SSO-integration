
// Utility function to format keys for display
export const formatKey = (key: string) => {
    const formattedKey = key.replace(/_/g, ' ').toUpperCase();
    return formattedKey.charAt(0) + formattedKey.slice(1); // Capitalize the first letter
  };
  