const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    console.log("Copied to clipboard");
  } catch (error) {
    console.error("Copied to clipboard failed: ", error);
  }
};

export default copyToClipboard;