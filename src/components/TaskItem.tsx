import { useRef, useState, type FormEvent } from 'react';
import styled from '@emotion/styled';
import type { Task } from '../types';
import { Input, QuietButton } from '../styles';

const Row = styled.li`
  padding: 20px 0; border-bottom: 1px solid #edf0e8;
  display: flex; align-items: center; gap: 14px;
  &:last-child { border-bottom: 0; }
  @media (max-width: 580px) { flex-wrap: wrap; }
`;
const Check = styled.input`width: 21px; height: 21px; flex-shrink: 0; accent-color: #396445; cursor: pointer;`;
const Text = styled.span<{ done: boolean }>`
  flex: 1; min-width: 0; overflow-wrap: anywhere; line-height: 1.6;
  color: ${props => props.done ? '#788477' : '#293f31'};
  text-decoration: ${props => props.done ? 'line-through' : 'none'};
`;
const Actions = styled.div`display: flex; gap: 7px; @media (max-width: 580px) { margin-left: auto; }`;
const EditForm = styled.form`width: 100%; display: flex; flex-wrap: wrap; gap: 10px; input { flex: 1 1 200px; }`;

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const editButton = useRef<HTMLButtonElement>(null);
  function closeEditor() {
    setEditing(false);
    requestAnimationFrame(() => editButton.current?.focus());
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim()) return;
    onEdit(task.id, draft); closeEditor();
  }
  return <Row>
    {editing ? <EditForm onSubmit={save} onKeyDown={event => { if (event.key === 'Escape') closeEditor(); }}>
      <Input autoFocus aria-label="Текст дела" value={draft} maxLength={200} onChange={event => setDraft(event.target.value)} />
      <QuietButton type="submit" disabled={!draft.trim()}>Сохранить</QuietButton>
      <QuietButton type="button" onClick={closeEditor}>Отмена</QuietButton>
    </EditForm> : <>
      <Check type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} aria-label={`Выполнено: ${task.text}`} />
      <Text done={task.completed}>{task.text}</Text>
      <Actions>
        <QuietButton ref={editButton} aria-label={`Изменить: ${task.text}`} onClick={() => { setDraft(task.text); setEditing(true); }}>Изменить</QuietButton>
        <QuietButton aria-label={`Удалить: ${task.text}`} onClick={() => onDelete(task.id)}>Удалить</QuietButton>
      </Actions>
    </>}
  </Row>;
}
