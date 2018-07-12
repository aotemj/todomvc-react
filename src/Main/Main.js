import React, { Component } from 'react';
import TodoItem from '../TodoItem/TodoItem';

class Main extends Component {
  render() {
    return (
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul className="todo-list">
          {
            this.props.todoList.map((item, index) => {
              return (
                <TodoItem
                  content={item.content} key={index} completed={item.completed}
                  editing={item.editing}
                  toggleStatus={this.props.toggleStatus}
                  toggleEditing={this.props.toggleEditing}
                  index={index}
                  delItem={this.props.delItem}
                />
              )
            })
          }
          </ul>
      </section>
    )
  }
}
// Main.propTypes={
    // editing:React.PropTypes.string
// }
export default Main