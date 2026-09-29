import { useState, type FormEvent } from 'react';
import styled from '@emotion/styled';
import { Button, Input } from '../styles';

const Form = styled.form`
  display: flex; gap: 10px;
  @media (max-width: 480px) { flex-direction: column; }
`;
const Submit = styled(Button)`white-space: nowrap;`;

export function TaskForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) return;
    onAdd(text); setText('');
  }
  return <Form onSubmit={handleSubmit}>
    <Input aria-label="Новое дело" placeholder="Что планируем сделать?" maxLength={200} value={text} onChange={event => setText(event.target.value)} />
    <Submit disabled={!text.trim()} type="submit">＋ Добавить</Submit>
  </Form>;
}
