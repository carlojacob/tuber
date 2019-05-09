const replaceQuotes = string => {
  return string.replace(/&quot;/g, '"').replace(/&#39;/g, '\'')
}

export default replaceQuotes
