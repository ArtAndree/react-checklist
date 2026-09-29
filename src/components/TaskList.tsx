import styled from '@emotion/styled';
import { TaskItem } from './TaskItem';
import type { Task } from '../types';

const List = styled.ul`list-style: none; padding: 0; margin: 8px 0 0;`;
const Empty = styled.div`text-align: center; padding: 48px 12px; color: #74816f; line-height: 1.8;`;
interface Props {
  tasks: Task[];
  emptyMessage: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}
export function TaskList({ tasks, emptyMessage, ...actions }: Props) {
  if (!tasks.length) return <Empty>{emptyMessage}</Empty>;
  return <List aria-label="Список дел">{tasks.map(task => <TaskItem key={task.id} task={task} {...actions} />)}</List>;
}
