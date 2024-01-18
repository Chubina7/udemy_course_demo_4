import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const [showComments, setShowComments] = useState(false);

  const { eventId } = props;


  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = (commentData) => {
    const newComment = {
      eventId: eventId,
      email: commentData.email,
      name: commentData.name,
      text: commentData.text
    }

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        // Error case
        if (data.alertMessage) {
          console.error(data.message)
          // alert(data.alertMessage)
        }
        // Succses case
        if (data.comment) {
          // alert(data.message)
          console.log(data.comment);
        }
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
