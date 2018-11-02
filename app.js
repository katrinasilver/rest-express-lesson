const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

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

/* Add RESTful routes for the following:

  - GET author by index
    - should respond 404 if author at index does not exist
  - POST author  
  - GET all books by author
  - POST book by author
    - should respond 404 if author does not exist
  - PATCH specific book by author
    - should respond 404 if author does not exist
  - DELETE specific book by author
    - should respond 404 if author does not exist
  
  Bonus challenge: Make middleware that checks if the requested author index exists, respond 404 if not.
*/

app.get('/authors', (req, res) => {
  res.send(authors)
})

app.post('/authors', (req, res) => {
  const newAuthor = req.body.name
  authors.push(newAuthor)
  res.status(201).send(newAuthor)
})

app.get('/authors/:id', (req, res, next) => {
  const authorIndex = req.params.id
  const author = authors[authorIndex]
  
  if(!author) {
    next()
  }

  res.send(author)
})

app.get('/authors/:id/books', (req, res) => {
  const authorIndex = req.params.id
  const author = authors[authorIndex]
  
  if (!author) {
    next()
  }

  res.send(authors[authorIndex].books)
})

app.post('/authors/:id/books', (req, res) => {
  const authorIndex = req.params.id
  const author = authors[authorIndex]
  
  if (!author) {
    next()
  }

  const newBook = req.body.title
  authors[authorIndex].books.push(newBook)
  res.status(201).send(newBook)
})

app.delete('/authors/:id/books/:bookId', (req, res) => {
  const authorIndex = req.params.id
  const bookIndex = req.params.bookId
  const author = authors[authorIndex]
  
  if (!author) {
    next()
  }

  if(!author.books[bookIndex]) {
    nex()
  }

  author.books.splice(bookIndex, 1)
  res.send(author.books)

})

app.use((req, res) => {
  res.sendStatus(404)
})


app.listen(port, () => console.log(`Listening on port ${port}`))
