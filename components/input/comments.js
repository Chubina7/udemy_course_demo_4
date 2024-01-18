import { useContext, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments({ eventId }) {
  const notificationCtx = useContext(NotificationContext)
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = (commentData) => {
    notificationCtx.showNotification({
      title: "Commenting...",
      message: "Sending comment to a database...",
      status: "pending",
    })

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
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return res.json().then(data => {
          throw new Error(data.message || "Something went wrong!")
        })
      })
      .then(data => {
        notificationCtx.showNotification({
          title: "Commented!",
          message: "Comment add successfully!",
          status: "success",
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList shouldReRender={notificationCtx.notification?.status} />}
    </section>
  );
}

export default Comments;
