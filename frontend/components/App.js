import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: ''
    }
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message })
      })
  }
  onTodoNameInputChange = (e) => {
    const { value } = e.target
    this.setState({ ...this.state, todoNameInput: value })
  }
  onTodoFormSubmit = (e) => {
    e.preventDefault();
    this.postNewTodo()
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.fetchAllTodos();
        this.setState({
          ...this.state, todoNameInput: ''
        })
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message })

      })
  }

  componentDidMount() {
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {this.state.todos.map(td => {
            return <div key={td.id}>{td.name}</div>
          })}
        </div>
        <form onSubmit={this.onTodoFormSubmit} id='todoForm'>
        <input onChange={this.onTodoNameInputChange} value={this.state.todoNameInput} type='text' placeholder='Type todo'></input>
        <button type='submit'>Submit</button><br/>
        </form>
        <button>Clear Completed</button>
      </div>
    )
  }
}
