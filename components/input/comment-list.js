import { useRouter } from 'next/router';
import classes from './comment-list.module.css';

function CommentList() {
  const router = useRouter()
  const eventId = router.query.eventId

  fetch(`api/comments/${eventId}`)
    .then(res => res.json())
    .then(data => console.log(data))


  return (
    <ul className={classes.comments}>


      {/* Render list of comments - fetched from API */}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
