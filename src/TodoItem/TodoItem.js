import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import classNames from 'classnames';

class ListItem extends Component {
  constructor() {
    super();
    this.toggleStatus = this.toggleStatus.bind(this)
    this.delItem = this.delItem.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
  }

  // 切换收藏
  toggleStatus() {
    PubSub.publish('toggleStatus', this.props.index);
  }

  // 删除todos
  delItem() {
    PubSub.publish('delItem',this.props.index);
  }

  // 编辑
  handleEdit() {
    // this.refs.editIpt.vlaue=this.props.content
  }

  // 切换编辑状态
  toggleEditing() {
    PubSub.publish('toggleEditing', this.props.index);
  }

  // 关闭编辑
  closeEdit() {
    // console.log('blur');
  }

  render() {
    return (
      <li
        className={classNames({
          completed: this.props.completed,
          editing: this.props.editing,
        })}
        onDoubleClick={this.toggleEditing}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this.toggleStatus}
            checked={this.props.completed}
          />
          <label>{this.props.content}</label>
          <button
            type="button"
            className="destroy"
            onClick={this.delItem}
          />
        </div>
        <input
          ref="editIpt"
          className="edit"
          value={this.props.content}
          onChange={this.handleEdit}
          onBlur={this.closeEdit}
        />
      </li>
    );
  }
}

export default ListItem;
