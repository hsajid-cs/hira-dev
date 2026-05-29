import { useState, useRef } from 'react';
import { wallOfLoveData } from '../../data/portfolioData';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import '../../styles/wallOfLove.css';

export default function WallOfLove() {
  const [userComments, setUserComments] = useLocalStorage('wallOfLove', []);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [justAdded, setJustAdded] = useState(null);
  const formRef = useRef(null);

  const allComments = [
    ...wallOfLoveData.defaultComments,
    ...userComments,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newComment = {
      text: `"${message.trim()}"`,
      name: name.trim() || 'anonymous',
      relationship: relationship.trim() || 'a visitor',
      isUser: true,
    };

    setUserComments([...userComments, newComment]);
    setJustAdded(allComments.length);
    setName('');
    setRelationship('');
    setMessage('');

    setTimeout(() => setJustAdded(null), 500);
  };

  // Random slight rotations for organic feel
  const getRotation = (i) => {
    const rotations = [-1.5, 0.8, -0.5, 1.2, -0.8, 1.5, -1, 0.5];
    return rotations[i % rotations.length];
  };

  return (
    <div className="wall-container">
      <div className="letter-decoration">{wallOfLoveData.deco}</div>
      <div className="letter-section-title">{wallOfLoveData.title}</div>
      <div className="letter-section-sub">{wallOfLoveData.sub}</div>

      <div className="wall-grid">
        {allComments.map((comment, i) => (
          <div
            key={i}
            className={`wall-note ${justAdded === i ? 'new' : ''}`}
            style={{ transform: `rotate(${getRotation(i)}deg)` }}
          >
            <div className="wall-note-text">{comment.text}</div>
            <div className="wall-note-by">
              — {comment.name} · {comment.relationship}
            </div>
          </div>
        ))}
      </div>

      <form className="wall-form" onSubmit={handleSubmit} ref={formRef}>
        <div className="wall-form-title">leave a note ✦</div>
        <div className="wall-form-row">
          <input
            className="wall-form-input"
            type="text"
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="wall-form-input"
            type="text"
            placeholder="who are you to me?"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>
        <textarea
          className="wall-form-textarea"
          placeholder="say something nice... or chaotic. both work."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="wall-form-submit" type="submit">
          pin it to the wall ✦
        </button>
      </form>
    </div>
  );
}
