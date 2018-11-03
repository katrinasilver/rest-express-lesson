const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json()) // same as body-parser

const authors = [
  {
    name: 'Haruki Murakami',
    books: [
      'Hard-Boiled Wonderland and the End of the World',
      'The Wind-Up Bird Chronicle'
    ]
  },
  {
    name: 'Kurt Vonnegut',
    books: [
      'Slaughterhouse-Five'
    ]
  }
]

app.route('/authors')
  // GET all authors
  .get((req, res) => {
    res.status(200).send(authors)
  })
  // ADD new author
  .post((req, res) => {
    let name = req.body.name

    if (!name) next()

    authors.push({ name, books: [] })
    res.status(201).send(authors)
  })

// GET authors by index
app.get('/authors/:id', (req, res) => {
  let id = req.params.id

  if (!authors[id]) next()

  res.status(200).send(authors[id])
})

app.route('/authors/:id/books')
  // GET all books by author
  .get((req, res) => {
    let id = req.params.id

    if (!authors[id]) next()

    res.status(200).send(authors[id].books)
  })
  // POST a book by author
  .post((req, res) => {
    let id = req.params.id
    let book = req.body.title

    if (!authors[id] || !book) next()

    authors[id].books.push(book)
    res.status(201).send(authors)
  })

  app.route('/authors/:id/books/:bookIndex')
  // PATCH specific book by author
  .patch((req, res) => {
    let id = req.params.id
    let bid = req.params.bookIndex

    let author = authors[id]
    let newBook = req.body.title

    if (!author || !newBook) next()

    author.books.splice(bid, 1, newBook) // patch a book
    res.status(201).send(authors)
  })
  // DELETE specific book by author
  .delete((req, res) => {
    let id = req.params.id
    let bid = req.params.bookIndex
    let author = authors[id]

    if (!author) next()

    author.books.splice(bid, 1) // delete book
    res.status(200).send(authors)
  })

// ERROR messages
app.use((err, req, res, next) => {
  // console.error(err.stack)
  res.status(404).send(`<h1>Can I haz author?</h1> \n ${err.stack}`)
  // res.sendStatus(404)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
