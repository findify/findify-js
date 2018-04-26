function createItemMock(title, image_url) {
  return {
    title,
    image_url,
    get(name) { return this[name] },
    hashCode() { return title + image_url }
  }
}

module.exports = createItemMock
