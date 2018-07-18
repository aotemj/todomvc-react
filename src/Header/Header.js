import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Header extends Component {
  constructor() {
    super();
    this.addNewItem = this.addNewItem.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      newIpt: '',
    };
  }

  // 文本内容改变
  changeValue(e) {
    this.setState({
      newIpt: e.target.value,
    });
    // const val = this.refs.newIpt.value;
  }

  addNewItem(e) {
    const { keyCode } = e;
    const NEW_ITEM = this.state.newIpt.trim();
    // 监控回车键
    if (keyCode === 13 && NEW_ITEM !== '') {
      PubSub.publish('addNewTodo', NEW_ITEM);
      this.setState({
        newIpt: '',
      });
    }
  }

  render() {
    return (
      <header className="header">
        <h1>
          todos
        </h1>
        <input
          className="new-todo"
          value={this.state.newIpt}
          placeholder="What needs to be done?"
          onChange={this.changeValue}
          onKeyUp={this.addNewItem}
        />
      </header>
    );
  }
}

export default Header;
