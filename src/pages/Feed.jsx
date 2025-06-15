import { useState } from "react";
import TweetList from "../assets/Components/TweetList.jsx";
import TweetForm from "../assets/Components/TweetForm.jsx";
import Navbar from "../assets/Components/Navbar";

export default function Feed({ username }) {
  const [tweets, setTweets] = useState([
    { id: 1, user: "alice", text: 'Merhaba dünya' },
    { id: 2, user: "bob", text: 'Tweet app güzel olmuş' }
  ]);

  const handleTweet = (text) => {
    if (!text.trim()) return;
    setTweets([
      { id: crypto.randomUUID, user: username, text},
      ...tweets
    ])
  };

  return (
    <>
      <Navbar username={username} />
      <div className="feed">
        <h2>Tweet Akışı</h2>

        <TweetForm onTweet={handleTweet} />
        <TweetList tweets={tweets} />
      </div>
    </>
  )
}