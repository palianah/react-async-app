import React from 'react';
import CommentListItem from './CommentListItem';

const CommentList = props => {
    return (
      <div>
          <h2>Comments (first five)</h2>
          {!props.isLoading && props.comments.length > 0 ? (
              props.comments.slice(0, 5).map(comment => {
                  const { id, title, body } = comment;

                  return(
                      <CommentListItem
                          title={title}
                          body={body}
                          itemKey={id}
                      />
                  )
              })
          ): (
              <p className="error">Keine Kommentare mit der ID {props.userId} gefunden</p>
          )}
      </div>
    );
};

export default CommentList;