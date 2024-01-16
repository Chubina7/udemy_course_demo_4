import { useRouter } from 'next/router';
import classes from './comment-list.module.css';
import { useState } from 'react';

function CommentList() {
  const [allComments, setAllComments] = useState([])

  const router = useRouter()
  const eventId = router.query.eventId

  fetch(`/api/comments/${eventId}`)
    .then(res => res.json())
    .then(data => setAllComments(data.selectedComments))


  const reversedComments = allComments.reverse()
  return (
    <ul className={classes.comments}>
      {reversedComments.map(comment => {
        return <li>
          <p>{comment.name} commented: </p>
          <h3>{comment.text}</h3>
          <p style={{ textAlign: 'right' }}>{comment.email}</p>
        </li>
      })}
    </ul>
  );
}

export default CommentList;
