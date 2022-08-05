exports.headerdate = headerdate()
function headerdate() {
  const today = new Date()
  const options = {
    weekday: "long",
    //   year: "numeric",
    month: "long",
    day: "numeric",
  }
  let day = today.toLocaleDateString("en-US", options)

  return day
}
