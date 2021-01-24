import React from "react";
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import axios from "axios";


class ToDoContainer extends React.Component {

  state = {
    todos: [],
    show: false
   };

  handleCheckboxChange = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      }),
      show: !this.state.show,
    })
  }

  handleDelToDo = id => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => 
        this.setState({
          todos: [
            ...this.state.todos.filter(todo => {
              return todo.id !== id;
            })
          ]
        })
      )
  };

  addToDoItem = title => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false
      })
      .then(response => this.setState({
        todos: [...this.state.todos, response.data]
      })
    );
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      params: {
        _limit: 10
      }
    })
    .then(response => this.setState({todos: response.data}));
  }

  render() {
    return (
      <div className="container">
        <Header headerSpan={this.state.show} />
        <InputTodo addToDoProps={this.addToDoItem} />
        <TodoList 
          todos={this.state.todos} 
          handleChangeProps={this.handleCheckboxChange} 
          deleteToDo={this.handleDelToDo}
        />
      </div>
    );
  }
}
 
export default ToDoContainer;