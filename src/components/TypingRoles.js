import { useEffect, useState } from 'react';

const roles = ['Game Developer', 'Game Artist'];

export default function TypingRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const completed = letterCount === currentRole.length;
    const empty = letterCount === 0;
    const delay = deleting ? 35 : completed ? 2000 : 55;

    const timer = window.setTimeout(() => {
      if (deleting && empty) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else if (!deleting && completed) {
        setDeleting(true);
      } else setLetterCount((count) => count + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, letterCount, roleIndex]);

  return (
    <p className="typing-role" aria-label={roles[roleIndex]}>
      <strong>{roles[roleIndex].slice(0, letterCount)}<i aria-hidden="true" /></strong>
    </p>
  );
}
