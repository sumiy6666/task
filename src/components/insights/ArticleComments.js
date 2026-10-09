import React from 'react';
import { CommentBox } from '../ui/CommentBox';
import { Reveal } from '../ui/Reveal';
import { CommentIcon, LikeIcon } from '../discussions/icons';
import styles from './Article.module.css';

// One comment. Forum comments carry Discourse's sanitised `html`; sample
// comments carry plain `text`.
function Comment({ comment }) {
  return (
    <div className={styles.comment}>
      <img className={styles.commentAvatar} src={comment.author.avatar} alt="" />
      <div className="min-w-0">
        <div className={styles.commentName}>{comment.author.name}</div>
        {comment.html ? (
          <div className={styles.commentText} dangerouslySetInnerHTML={{ __html: comment.html }} />
        ) : (
          <p className={styles.commentText}>{comment.text}</p>
        )}
        {comment.likes != null && (
          <div className={styles.commentStats}>
            <span><LikeIcon />{comment.likes}</span>
            <span><CommentIcon />{comment.children?.length ?? 0}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// The comment box, then each thread (a comment, its replies indented
// beneath, and a box to reply to it).
export function ArticleComments({ topicId, comments, currentUser }) {
  return (
    <section className={styles.comments} aria-label="Comments">
      <div className={styles.commentComposer}>
        <CommentBox topicId={topicId} avatar={currentUser?.avatar} placeholder="Add a comment" />
      </div>

      {comments.map((comment) => (
        <Reveal key={comment.id} className={styles.thread}>
          <Comment comment={comment} />
          {comment.children?.length > 0 && (
            <div className={styles.children}>
              {comment.children.map((child) => <Comment key={child.id} comment={child} />)}
            </div>
          )}
          <CommentBox
            topicId={topicId}
            replyToPostNumber={comment.postNumber ?? null}
            avatar={currentUser?.avatar}
            placeholder="Add a comment"
            hideAvatar
            className={styles.threadReply}
          />
        </Reveal>
      ))}
    </section>
  );
}
