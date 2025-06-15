import { useState } from "react"
import '/src/twitter.css'

export default function TweetForm({ onTweet }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onTweet(text);
    setText('');
  }

  return (
    <form className="tweet-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Ne düşünüyorsun"
        maxLength={280}
        rows={3}
      />
      <button disabled={!text.trim()}>Tweetle</button>
    </form>
  )
}