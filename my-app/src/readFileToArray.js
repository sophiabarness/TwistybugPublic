const readFileToArray = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      const lines = text.split("\n").filter((line) => line.trim() !== "");
      return lines;
    } catch (error) {
      console.error("Error reading the file:", error);
      return [];
    }
  };
  
  export default readFileToArray;