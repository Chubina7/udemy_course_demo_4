import { useRouter } from 'next/router';
import classes from './comment-list.module.css';
import { useEffect, useState } from 'react';

function CommentList(props) {
  const [allComments, setAllComments] = useState([])
  const [outputMessage, setOutputMessage] = useState("")
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const eventId = router.query.eventId

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/comments/${eventId}`)
      const data = await response.json()

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
    }
    fetchData()
  }, [allComments])

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
