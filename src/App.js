import axios from 'axios'
import React, { Component } from 'react'
import SearchForm from './component/SearchForm'
import ImgMediaCard from './component/CardView'
import './App.css'
import { Button } from '@material-ui/core'
import Header from './component/Header'
import Footer from './component/Footer'
export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      showBooks: false,
    }
  }
  searchBook = (event) => {
    event.preventDefault()
    let searchQuery = event.target.searchQuery.value
    let strArr = searchQuery.split(' ')
    searchQuery = strArr.join('+')
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
      .then(tempArr => {
        this.setState({
          books: tempArr.data.items,
          showBooks: true

        })
      })
      .catch(error => {
        alert('we are sory , no books are found by your search ')
        console.log(error);
      })
  }
  titleSort = () => {
    let bookForSort = this.state.books
    bookForSort.sort((book1, book2) => {
      if (book1.volumeInfo.title < book2.volumeInfo.title) {
        return -1;
      }
      if (book1.volumeInfo.title > book2.volumeInfo.title) {
        return 1;
      }
    })
    this.setState({
      books: bookForSort
    })
  }
  autherSort = () => {
    let bookForSort = this.state.books.filter(book=>{
      if(book.volumeInfo.authors != undefined) return book
    })
    
    bookForSort.sort((book1, book2) => {
      if (book1.volumeInfo.authors[0] < book2.volumeInfo.authors[0]) {
        return -1;
      }
      if (book1.volumeInfo.authors[0] > book2.volumeInfo.authors[0]) {
        return 1;
      }
    })
    this.setState({
      books: bookForSort
    })
  }
  render() {
    return (
      <div class='all'>
        <div class='header'>
          <Header />
        </div>

        {console.log(this.state.books)}
        <div class='butts'>
          <SearchForm class = 'form' searchBook={this.searchBook} />

          {this.state.showBooks && <Button class="click" onClick={this.titleSort}>Sort By Title</Button>}
          {this.state.showBooks && <Button class="click" onClick={this.autherSort}>Sort By Auther</Button>}
        </div>
        <div class ='cardshow'>
        {this.state.showBooks && this.state.books.map((book, key) => {
          return (
            <div class='bookCard'>
              <ImgMediaCard class='card1' image={book.volumeInfo.imageLinks.smallThumbnail} title={book.volumeInfo.title} description={book.volumeInfo.description} authors={book.volumeInfo.authors} more={book.volumeInfo.previewLink} />

            </div>
          )

        })}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
