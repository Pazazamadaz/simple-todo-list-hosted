import React from "react";
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";

class ToDoContainer extends React.Component {

  state = {
    todos: [
      {
        id: uuidv4(),
        title: "Setup development environment",
        completed: true
      },
      {
        id: uuidv4(),
        title: "Develop website and add content",
        completed: false
      },
      {
        id: uuidv4(),
        title: "Deploy to live server",
        completed: true
      }
    ]
   };

  handleCheckboxChange = id => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    }));
   };

  handleDelToDo = id => {
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => {
          return todo.id !== id;
        })
      ]
    })
  };

  addToDoItem = title => {
    const newToDo = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newToDo]
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
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