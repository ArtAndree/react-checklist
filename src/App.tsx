import { useState } from 'react';
import styled from '@emotion/styled';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import type { Filter } from './types';

const Page = styled.main`max-width: 900px; margin: 0 auto; padding: 36px 24px 28px; @media(max-width: 480px) { padding: 24px 16px; }`;
const Brand = styled.div`display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: -.4px;`;
const Mark = styled.span`background: #294f3c; color: #e6efc7; border-radius: 10px; width: 33px; height: 33px; display: grid; place-items: center; font-size: 22px;`;
const Hero = styled.header`padding: 52px 0 28px; h1 { font-size: clamp(32px, 6vw, 48px); font-weight: 650; letter-spacing: -2px; margin: 12px 0; } p { color: #788170; margin: 0; line-height: 1.7; }`;
const Eyebrow = styled.span`color: #6a7856; font-size: 11px; letter-spacing: 2px; font-weight: 700;`;
const Card = styled.section`background: #fff; border: 1px solid #e4e7dd; border-radius: 22px; padding: 28px; box-shadow: 0 12px 35px #344b2210; @media(max-width:480px) { padding: 20px 16px; }`;
const Top = styled.div`display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 23px; h2 { margin: 0 0 6px; font-size: 21px; letter-spacing: -.5px; } p { margin: 0; font-size: 13px; color: #788170; }`;
const Badge = styled.span`background: #f0f3e5; padding: 10px 13px; border-radius: 12px; font-size: 13px; color: #5c7045; white-space: nowrap;`;
const Toolbar = styled.div`padding: 25px 0 12px; border-bottom: 1px solid #edf0e8;`;
const ProgressBox = styled.section`background: #eaf0df; padding: 23px 26px; border-radius: 17px; margin-top: 20px; display: grid; gap: 13px; p { display: flex; justify-content: space-between; margin: 0; font-size: 14px; } progress { width: 100%; height: 8px; border: 0; border-radius: 8px; overflow: hidden; background: #d7e1c9; } progress::-webkit-progress-bar { background: #d7e1c9; } progress::-webkit-progress-value { background: #577641; border-radius: 8px; } progress::-moz-progress-bar { background: #577641; }`;
const Footer = styled.footer`text-align: center; color: #7b8475; font-size: 12px; margin-top: 30px; line-height: 1.8;`;
const Warning = styled.p`color: #92511d; font-size: 13px;`;
const emptyMessages: Record<Filter, string> = {
  all: 'Здесь начинается ваш план. Добавьте первое дело выше.',
  active: 'Всё готово! Можно выдохнуть или придумать новую цель.',
  completed: 'Пока нет выполненных дел. Начните с одного небольшого шага.',
};

export default function App() {
  const { tasks, storageError, addTask, editTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<Filter>('all');
  const completed = tasks.filter(task => task.completed).length;
  const percentage = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  const visibleTasks = tasks.filter(task => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed));
  return <Page>
    <Brand><Mark aria-hidden="true">✓</Mark> по порядку</Brand>
    <Hero><Eyebrow>МЕНЬШЕ СУЕТЫ. БОЛЬШЕ ЯСНОСТИ.</Eyebrow><h1>Большие планы.<br />Маленькие шаги.</h1><p>Освободите голову — пусть ваши дела будут здесь.</p></Hero>
    <Card aria-labelledby="list-title">
      <Top><div><h2 id="list-title">Мой чеклист</h2><p>Один пункт — на шаг ближе к цели</p></div><Badge>Ваш темп ✦</Badge></Top>
      <TaskForm onAdd={text => { addTask(text); setFilter('all'); }} />
      {storageError && <Warning role="alert">Браузер не разрешил сохранение. Список доступен до перезагрузки страницы.</Warning>}
      <Toolbar><TaskFilters value={filter} onChange={setFilter} counts={{ all: tasks.length, active: tasks.length - completed, completed }} /></Toolbar>
      <TaskList tasks={visibleTasks} emptyMessage={emptyMessages[filter]} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />
    </Card>
    <ProgressBox aria-label="Прогресс выполнения">
      <p><span aria-live="polite">Выполнено {completed} из {tasks.length}</span><strong>{percentage}%</strong></p>
      <progress max={100} value={percentage} aria-label="Процент выполненных дел" />
    </ProgressBox>
    <Footer>{storageError ? 'Сохранение недоступно' : 'Дела сохраняются в этом браузере'}<br />Сделано с React, TypeScript и Emotion</Footer>
  </Page>;
}
