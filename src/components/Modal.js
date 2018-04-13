import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal as ModalAntd, Form, Input, Button, Select, Row, Col } from 'antd';

import { addPost, editPost, addComment, editComment, setModal } from '../redux/actions';
import { generateUUID } from '../utils';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class Modal extends Component {
  state = {
    id: '',
    title: '',
    body: '',
    author: '',
    category: ''
  }

  isModalOpen = () => this.props.modal && typeof this.props.modal === 'object';
  isEditing = () => this.isModalOpen() && (this.props.modal.title || this.props.modal.body);
  isCommentModal = () => this.isModalOpen() && this.props.modal.title === undefined;
  isPostModal = () => this.isModalOpen() && this.props.modal.title !== undefined;

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal) {
      nextProps.modal.title || nextProps.modal.body
        ? this.setState({ ...nextProps.modal })
        : this.setState({ ...nextProps.modal, category: nextProps.category });
    }
  }

  handlePostSubmit = async () => {
    const { id, title, body, author, category } = this.state;

    this.isEditing()
      ? await this.props.editPost(id, {
          timestamp: new Date().getTime(),
          title,
          body
        })
      : await this.props.addPost({
          id: generateUUID(),
          timestamp: new Date().getTime(),
          title,
          body,
          author,
          category
        });

    this.props.closeModal();
  }

  handleCommentSubmit = async () => {
    const { id, body, author } = this.state;

    // for comments id will be post.id
    this.isEditing()
      ? await this.props.editComment(id, {
          timestamp: new Date().getTime(),
          body
        })
      : await this.props.addComment({
          id: generateUUID(),
          timestamp: new Date().getTime(),
          body,
          author,
          parentId: id
        });

    this.props.closeModal();
  }

  canISubmit = () => {
    const { title, body, author, category } = this.state;

    return (
      (this.isCommentModal() && body.length && author.length) ||
      (this.isPostModal() && title.length && body.length && author.length && category.length)
        ? true
        : false
    );
  }

  render() {
    const { title, body, author, category } = this.state;

    return (
      <ModalAntd
        title={<div style={{ fontSize: '24px' }}>{this.isEditing() ? 'Edit' : 'New'} {this.isPostModal() ? 'Post' : 'Comment'}</div>}
        visible={this.isModalOpen()}
        onCancel={() => this.props.closeModal()}
        footer={[
          <Button key="cancel" onClick={() => this.props.closeModal()}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={!this.canISubmit()}
            onClick={this.isPostModal() ? this.handlePostSubmit : this.handleCommentSubmit}
          >
            {this.isEditing() ? 'Edit' : 'Add'}
          </Button>
        ]}
      >
        <Form>
          {this.isPostModal()
            ? <FormItem>
                <Input
                  type="text"
                  value={title}
                  placeholder="Pick a title"
                  onChange={e => this.setState({ ...this.state, title: e.target.value })}
                />
              </FormItem>
            : null
          }
          <FormItem>
            <TextArea
              type="text"
              autosize={{ minRows: 5, maxRows: 7 }}
              value={body}
              placeholder={this.isPostModal() ? 'What are your thoughts today?' : 'Comment something about it!'}
              onChange={e => this.setState({ ...this.state, body: e.target.value })}
            />
          </FormItem>
          {!this.isEditing()
            ? <FormItem>
                <Row gutter={8}>
                  <Col span={this.isPostModal() ? 16 : 24}>
                    <Input
                      type="text"
                      value={author}
                      placeholder="Who are you?"
                      onChange={e => this.setState({ ...this.state, author: e.target.value })}
                    />
                  </Col>
                  {this.isPostModal()
                    ? <Col span={8}>
                        <Select value={category} onChange={value => this.setState({ ...this.state, category: value })}>
                          <Option value="" disabled style={{ color: '#BFBFC1' }}><div style={{ color: '#BFBFC1' }}>Pick a category</div></Option>
                          <Option value="udacity">Udacity</Option>
                          <Option value="react">React</Option>
                          <Option value="redux">Redux</Option>
                        </Select>
                      </Col>
                    : null
                  }
                </Row>
              </FormItem>
            : null
          }
        </Form>
      </ModalAntd>
    );
  }
}

const mapStateToProps = ({ modal, categories }) => ({
  modal,
  category: categories.categorySelected === '/' ? '' : categories.categorySelected
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  editPost: (id, content) => dispatch(editPost(id, content)),
  addComment: post => dispatch(addComment(post)),
  editComment: (id, content) => dispatch(editComment(id, content)),
  closeModal: () => dispatch(setModal(null))
});

const ModalConnected = connect(mapStateToProps, mapDispatchToProps)(Modal);

export { ModalConnected as Modal };
