import React from 'react';

const CommentListItem = props => {
  return (
      <blockquote className="comment" key={props.itemKey}>
          <p className="comment__title">
              {props.title}
          </p>
          <p className="comment__body">
              {props.body}
          </p>
      </blockquote>
  );
};

export default CommentListItem;