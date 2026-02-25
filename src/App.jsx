import { useState } from 'react';
import LegacySection from './components/LegacySection';

const initialFaq = [
  {
    id: 1,
    question: 'How do I convert my HTML into React?',
    answer:
      'Create a component for each page block and replace class with className.'
  },
  {
    id: 2,
    question: 'What do I do with old JavaScript?',
    answer:
      'Move DOM changes into React state and event handlers (onClick, onChange, onSubmit).'
  }
];

export default function App() {
  const [faq, setFaq] = useState(initialFaq);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanQuestion = question.trim();
    const cleanAnswer = answer.trim();

    if (!cleanQuestion || !cleanAnswer) return;

    setFaq((current) => [
      ...current,
      {
        id: Date.now(),
        question: cleanQuestion,
        answer: cleanAnswer
      }
    ]);

    setQuestion('');
    setAnswer('');
  };

  return (
    <main className="container">
      <header className="page-header">
        <h1>ICSDC Frontend Migration</h1>
        <p>
          This page demonstrates how your existing HTML/CSS/JS structure can be
          represented with reusable React components.
        </p>
      </header>

      <LegacySection title="Migration checklist (React version)">
        <ul className="checklist">
          <li>Split each HTML section into a component.</li>
          <li>Move CSS to imported style files.</li>
          <li>Replace DOM queries with state and props.</li>
          <li>Use JSX event handlers instead of addEventListener.</li>
        </ul>
      </LegacySection>

      <LegacySection title="Converted interactive FAQ block">
        <p className="muted">
          A common vanilla-JS pattern is adding FAQ entries by updating the DOM.
          In React, we update state and render from that source of truth.
        </p>

        <form className="stack" onSubmit={handleSubmit}>
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="FAQ question"
            aria-label="FAQ question"
          />
          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="FAQ answer"
            aria-label="FAQ answer"
            rows={3}
          />
          <button type="submit">Add FAQ item</button>
        </form>

        <div className="faq-list">
          {faq.map((item) => (
            <article key={item.id} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </LegacySection>
    </main>
  );
}
