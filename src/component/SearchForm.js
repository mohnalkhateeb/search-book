import React, { Component } from 'react'

export class SearchForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.searchBook} >
                    <input class ='word' type="text" name="searchQuery" defaultValue=' Enter words to search your books '></input>
                    <input type="submit"  Value="Search"  ></input><br></br>
                </form>
            </div>
        )
    }
}

export default SearchForm
