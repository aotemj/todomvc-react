import React, { Component } from "react";
// import "./Header.scss"
class Header extends Component {
  constructor() {
    super();
    this.handleAddItem = this.handleAddItem.bind(this);
  }
  // 添加内容
  handleAddItem(e) {
    // console.log(e.keyCode);
    const keyCode = e.keyCode;
    const val = this.refs.newIpt.value;
    
    // 监控回车键
    if (keyCode === 13 && val.trim() !== "") {
      this.props.addNewTodo(val);
      this.refs.newIpt.value = "";
    }
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          ref="newIpt"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onKeyUp={this.handleAddItem}
        />
      </header>
    );
  }
}
export default Header;
