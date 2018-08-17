export default (text, css?, ...rest) => {
  console.log(
    `%cFindify: %c${text}`,
    'color: #5980B7; font-size: 10px; font-weight: bold;',
    css,
    ...rest
  )
}
