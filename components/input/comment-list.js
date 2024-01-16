import { useRouter } from 'next/router';
import classes from './comment-list.module.css';
import { useEffect, useState } from 'react';

function CommentList() {
  const [allComments, setAllComments] = useState([])
  const [outputMessage, setOutputMessage] = useState("")
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const eventId = router.query.eventId

  // !!! Should use useMemo hook
  // !!! the reason: it is needed to rerender every new coment, but without many re-renders
  useEffect(() => {
    fetch(`/api/comments/${eventId}`)
      .then(res => res.json())
      .then(data => {
        // Succses case
        if (data.selectedComments) {
          setLoading(false)
          setAllComments(data.selectedComments)
          console.log(data.message)
        }
        // Error case
        if (data.consoleMessage) {
          setOutputMessage(data.message)
          console.error(data.consoleMessage);
        }
      })
  }, [])

  return (
    <ul className={classes.comments}>
      <p>{loading && "Loading comments..."}</p>
      {allComments.length < 1 && !loading ? <p>There is no comments, start adding ones</p> : allComments.map(comment => {
        if (comment.eventId == eventId) {
          return (
            <li key={comment._id}>
              <p>{comment.name} commented: </p>
              <h3>{comment.text}</h3>
              <p style={{ textAlign: 'right' }}>{comment.email}</p>
            </li>
          )
        }
      })}
      <p>{outputMessage}</p>
    </ul>
  );
}

export default CommentList;
