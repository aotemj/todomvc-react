import React, { Component } from "react";
import PubSub from "pubsub-js";
import classNames from "classnames";

class ListItem extends Component {
  constructor(props) {
    super();
    this.toggleStatus = this.toggleStatus.bind(this);
    this.delItem = this.delItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.saveAndCloseEdit = this.saveAndCloseEdit.bind(this);
    this.state = {
      content: ""
    };
  }

  // 切换收藏
  toggleStatus() {
    PubSub.publish("toggleStatus", this.props.index);
  }

  // 删除todos
  delItem() {
    PubSub.publish("delItem", this.props.index);
  }

  // 编辑
  handleEdit(e) {
    console.dir(e.target.value);
    this.setState({
      content: e.target.value
    });
    // this.refs.editIpt.vlaue=this.props.content
  }

  // 切换编辑状态
  toggleEditing() {
    PubSub.publish("toggleEditing", this.props.index);
    this.setState({
      content: this.props.content
    });
  }

  // 保存并关闭
  saveAndCloseEdit(e) {
    const { index } = this.props;
    const { content } = this.state;

    // input失去焦点或点击回车键保存

    if (!e.keyCode || e.keyCode === 13) {
      PubSub.publish("saveAndCloseEdit", {
        index,
        content,
      });
    }
  }

  render() {
    return (
      <li
        className={classNames({
          completed: this.props.completed,
          editing: this.props.editing
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
          <button type="button" className="destroy" onClick={this.delItem} />
        </div>
        <input
          className="edit"
          value={this.state.content}
          onChange={this.handleEdit}
          onBlur={this.saveAndCloseEdit}
          onKeyUp={this.saveAndCloseEdit}
        />
      </li>
    );
  }
}

export default ListItem;
