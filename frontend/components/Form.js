import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.onTodoFormSubmit} id='todoForm'>
          <input onChange={this.props.onTodoNameInputChange} value={this.props.todoNameInput} type='text' placeholder='Type todo'></input>
          <button type='submit'>Submit</button><br />
        </form>
        <button onClick={this.props.toggleDisplayCompleteds}>{this.props.displayCompleteds ? 'Hide' : 'Show'}</button>
      </>
    )
  }
}

