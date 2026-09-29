import styled from '@emotion/styled';
import type { Filter } from '../types';

const Group = styled.div`display: flex; gap: 5px; flex-wrap: wrap;`;
const Tab = styled.button<{ selected: boolean }>`
  border: 0; padding: 9px 13px; border-radius: 9px; font-size: 14px;
  background: ${props => props.selected ? '#eaf0df' : 'transparent'};
  color: ${props => props.selected ? '#344e2d' : '#737e70'};
  font-weight: ${props => props.selected ? 600 : 400};
  &:hover { background: #f0f3e9; }
`;
const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' }, { value: 'active', label: 'В работе' }, { value: 'completed', label: 'Готово' },
];
export function TaskFilters({ value, onChange, counts }: { value: Filter; onChange: (filter: Filter) => void; counts: Record<Filter, number> }) {
  return <Group role="group" aria-label="Фильтр задач">{filters.map(filter =>
    <Tab key={filter.value} selected={value === filter.value} aria-pressed={value === filter.value} onClick={() => onChange(filter.value)}>
      {filter.label} · {counts[filter.value]}
    </Tab>)}</Group>;
}
