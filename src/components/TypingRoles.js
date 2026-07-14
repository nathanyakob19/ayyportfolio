import { useEffect, useState } from 'react';

const roles = ['Game Developer', 'Game Artist', 'Game Designer'];

export default function TypingRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const completed = letterCount === currentRole.length;
    const empty = letterCount === 0;
    const delay = deleting ? 45 : completed ? 1350 : 92;

    const timer = window.setTimeout(() => {
      if (completed) setDeleting(true);
      else if (deleting && empty) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else setLetterCount((count) => count + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, letterCount, roleIndex]);

  return (
    <p className="typing-role" aria-label={`I am a ${roles[roleIndex]}`}>
      <span>I am a</span>
      <strong>{roles[roleIndex].slice(0, letterCount)}<i aria-hidden="true" /></strong>
    </p>
  );
}
