import '/src/twitter.css'

export default function TweetList({ tweets = [] }) {
  if (!tweets.length) {
    return <div>Henüz tweet yok.</div>;
  }

  return (
    <ul className="tweet-list">
      {tweets.map(tweet => (
        <li key={tweet.id} className="tweet-item">
          <strong>@{tweet.user}:</strong> {tweet.text}
        </li>
      ))}
    </ul>
  );
}