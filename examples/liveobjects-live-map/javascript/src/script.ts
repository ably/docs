import { DefaultRoot, LiveMap, Realtime } from 'ably';
import Objects from 'ably/objects';
import { nanoid } from 'nanoid';
import { Tasks } from './ably.config';
import './styles.css';

const client = new Realtime({
  clientId: nanoid(),
  key: import.meta.env.VITE_ABLY_KEY as string,
  plugins: { Objects },
});

const urlParams = new URLSearchParams(window.location.search);

const channelName = urlParams.get('name') || 'objects-live-map';
const channel = client.channels.get(channelName, { modes: ['OBJECT_PUBLISH', 'OBJECT_SUBSCRIBE'] });

const taskInput = document.getElementById('task-input') as HTMLInputElement;
const addTaskButton = document.getElementById('add-task')!;
const tasksDiv = document.getElementById('tasks')!;
const removeAllTasksDiv = document.getElementById('remove-tasks')!;

async function main() {
  await channel.attach();

  const objects = channel.objects;
  const root = await objects.getRoot();

  await initTasks(root);
  addEventListenersToButtons(root);
}

async function initTasks(root: LiveMap<DefaultRoot>) {
  // subscribe to root to get notified when tasks object gets changed on the root.
  // for example, when we clear all tasks
  root.subscribe(({ update }) => {
    if (update.tasks === 'updated') {
      subscribeToTasksUpdates(root.get('tasks')!);
    }
  });

  if (root.get('tasks')) {
    subscribeToTasksUpdates(root.get('tasks')!);
    return;
  }

  await root.set('tasks', await channel.objects.createMap());
}

function subscribeToTasksUpdates(tasks: Tasks) {
  tasksDiv.innerHTML = '';

  tasks.subscribe(({ update }) => {
    Object.entries(update).forEach(async ([taskId, change]) => {
      switch (change) {
        case 'updated':
          tasksOnUpdated(taskId, tasks);
          break;
        case 'removed':
          tasksOnRemoved(taskId);
          break;
      }
    });
  });

  for (const [taskId] of tasks.entries()) {
    createTaskDiv({ id: taskId, title: tasks.get(taskId)! }, tasks);
  }
}

function tasksOnUpdated(taskId: string, tasks: Tasks) {
  const taskSpan = document.querySelector(`.task[data-task-id="${taskId}"] > span`);
  if (taskSpan) {
    taskSpan.innerHTML = tasks.get(taskId)!;
  } else {
    createTaskDiv({ id: taskId, title: tasks.get(taskId)! }, tasks);
  }
}

function tasksOnRemoved(taskId: string) {
  document.querySelector(`.task[data-task-id="${taskId}"]`)?.remove();
}

function createTaskDiv(task: { id: string; title: string }, tasks: Tasks) {
  const { id, title } = task;

  const parser = new DOMParser();
  const taskDiv = parser.parseFromString(
    `<div class="flex justify-between items-center rounded space-x-4 task" data-task-id="${id}">
        <span class="flex-grow">${title}</span>
        <button class="uk-btn uk-btn-primary uk-btn-sm uk-border-rounded-right update-task rounded-[1998px]">Edit</button>
        <button class="uk-btn uk-btn-sm uk-border-rounded-right remove-task rounded-[1998px] bg-transparent border border-black">Remove</button>
    </div>`,
    'text/html',
  ).body.firstChild as HTMLElement;

  tasksDiv.appendChild(taskDiv);

  taskDiv.querySelector('.update-task')!.addEventListener('click', async () => {
    const newTitle = prompt('New title for a task:');
    if (!newTitle) {
      return;
    }
    await tasks.set(id, newTitle);
  });
  taskDiv.querySelector('.remove-task')!.addEventListener('click', async () => {
    await tasks.remove(id);
  });
}

function addEventListenersToButtons(root: LiveMap<DefaultRoot>) {
  addTaskButton.addEventListener('click', async () => {
    const taskTitle = taskInput.value.trim();
    if (!taskTitle) {
      return;
    }

    const taskId = nanoid();
    taskInput.value = '';
    await root.get('tasks')?.set(taskId, taskTitle);
  });

  removeAllTasksDiv.addEventListener('click', async () => {
    await root.set('tasks', await channel.objects.createMap());
  });
}

main()
  .then()
  .catch((e) => console.error(e));
