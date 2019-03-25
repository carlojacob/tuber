const stringLimit = (string, chars) => {
  const numChars = string.length
  if (numChars > chars) {
    return `${string.substring(0, chars)}...`
  }
  return string
}

export default stringLimit
