const root = ''

exports.homePage = (req, res) => {
  res.render(`${root}index`, { title: 'Home' })
}
