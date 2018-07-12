import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

class App extends Component {
  constructor() {
    super();
    this.addNewTodo = this.addNewTodo.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.delItem = this.delItem.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.state = {
      todoList: [
        {
          content: '123',
          completed: true,
          editing: false,
        },
        {
          content: '45',
          completed: false,
          editing: true,
        },
      ],
    };
  }

  componentDidMount() {
    PubSub.subscribe('addNewTodo', (fnName, newTodo) => {
      this.addNewTodo(newTodo);
    });
    PubSub.subscribe('delItem', (fnName, index) => {
      this.delItem(index);
    });
    PubSub.subscribe('toggleStatus', (fnName, index) => {
      this.toggleStatus(index);
    });
    PubSub.subscribe('toggleEditing', (fnName, index) => {
      this.toggleEditing(index);
    });
  }

  // 新增todo
  addNewTodo(newTodo) {
    const todoList = this.state.todoList;
    todoList.push({
      content: newTodo,
      completed: false,
    });
    this.setState({
      todoList,
    });
  }

  // 切换是否完成状态
  toggleStatus(index) {
    const todoList = this.state.todoList;
    const completed = todoList[index].completed;
    todoList[index].completed = !completed;
    this.setState({
      todoList,
    });
  }

  // 删除todo
  delItem(index) {
    const todoList = this.state.todoList;
    todoList.splice(index, 1);
    this.setState({
      todoList,
    });
  }

  // 切换编辑
  toggleEditing(index) {
    const todoList = this.state.todoList;
    const editing = todoList[index].editing;
    todoList.forEach((item, index1) => {
      if (index1 !== index) {
        item.editing = false;
      }
    });
    todoList[index].editing = !editing;
    this.setState({
      todoList,
    });
  }

  render() {
    return (
      <div className="App">
        <section className="todoapp">
          <Header/>
          <Main
            todoList={this.state.todoList}
            toggleStatus={this.toggleStatus}
            toggleEditing={this.toggleEditing}
          />
          <footer id="footer" style={{display: 'block'}}>
            <span id="todo-count">
              <strong>
                  1
              </strong>
              item left
            </span>
            <ul id="filters">
              <li>
                <a className="selected" href="#/all">
                  All
                </a>
              </li>
              <li>
                <a href="#/active">
                  Active
                </a>
              </li>
              <li>
                <a href="#/completed">
                  Completed
                </a>
              </li>
            </ul>
          </footer>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default App;
