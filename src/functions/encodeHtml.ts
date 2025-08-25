const replaceTag = (tag: string): string => {
  const tagsToReplace: Record<string, string> = {
    '&': '&amp;'
    // '<': '&lt;',
    // '>': '&gt;',
    // '"': '&quot;',
    // "'": '&#x27;',
    // '/': '&#x2F;'
  }
  return tagsToReplace[tag] || tag
}

const encodeHtml = (str: string): string => str.replace(/[&<>]/g, replaceTag)

export default encodeHtml