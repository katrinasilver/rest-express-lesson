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
app.use(express.json())
app.route('/authors')
  .get((req, res, next) => {
    if (!authors) next() // send a 404
    res.send(authors)
  })
  // .post((req, res) => {
  //   let add = authors.push(req.body.name)
  //   console.log(add)
  //   res.send({add})
  // })

app.get('/authors/:id', (req, res) => {
  let query = req.params.id
  res.send(authors[query])
})

app.use((req, res) => {
  res.sendStatus(404, `Not found ${err.stack}`)
})


app.listen(port, () => console.log(`Listening on port ${port}`))
