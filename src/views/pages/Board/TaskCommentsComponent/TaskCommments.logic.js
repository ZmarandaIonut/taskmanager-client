const generateMessage = (message) => {
  return message.replaceAll(/@\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g, (text) => {
    let tmpText = text.replace(/@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g, "");
    tmpText = tmpText.replace(/@\w+/g, (matcher) => `<b>${matcher}</b>`);
    return tmpText;
  });
};

export { generateMessage };
