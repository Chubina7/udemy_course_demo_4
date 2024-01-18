import { useRouter } from 'next/router';
import classes from './comment-list.module.css';
import { useEffect, useState } from 'react';

function CommentList({ shouldReRender }) {
  const [allComments, setAllComments] = useState([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const eventId = router.query.eventId

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/comments/${eventId}`)
      const data = await response.json()

      setAllComments(data.selectedComments)
      setLoading(false)

      console.log("Fetching....")
      console.log("კონტექსტის მესიჯი", shouldReRender);
    }

    fetchData()
  }, [shouldReRender])

  return (
    <ul className={classes.comments}>
      {loading && <p>Loading...</p>}
      {allComments && allComments.map(comment => {
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
    </ul>
  );
}

export default CommentList;
