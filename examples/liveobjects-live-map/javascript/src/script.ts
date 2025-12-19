import { Realtime } from 'ably';
import { LiveMap, LiveObjects, type PathObject } from 'ably/liveobjects';
import { nanoid } from 'nanoid';
import { config } from './config';
import './styles.css';

export type Tasks = Record<string, string>;

const client = new Realtime({
  clientId: nanoid(),
  key: config.ABLY_KEY,
  plugins: { LiveObjects },
});

const channelName = config.CHANNEL_NAME || 'objects-live-map';
const channel = client.channels.get(channelName, { modes: ['object_publish', 'object_subscribe'] });

const taskInput = document.getElementById('task-input') as HTMLInputElement;
const addTaskButton = document.getElementById('add-task')!;
const tasksDiv = document.getElementById('tasks')!;
const removeAllTasksDiv = document.getElementById('remove-tasks')!;

async function main() {
  const tasksObject = await channel.object.get<Tasks>();

  await initTasks(tasksObject);
  addEventListenersToButtons(tasksObject);
}

async function initTasks(tasks: PathObject<LiveMap<Tasks>>) {
  // Subscribe to all changes for the tasks object
  tasks.subscribe(({ message }) => {
    if (!message) {
      return;
    }

    const operation = message.operation;

    // Handle individual task updates
    if (operation.action === 'map.set' && operation.mapOp?.key) {
      tasksOnUpdated(operation.mapOp.key, tasks);
    } else if (operation.action === 'map.remove' && operation.mapOp?.key) {
      tasksOnRemoved(operation.mapOp.key);
    }
  });

  // Render initial state
  renderAllTasks(tasks);
}

function renderAllTasks(tasks: PathObject<LiveMap<Tasks>>) {
  tasksDiv.innerHTML = '';
  for (const [taskId] of tasks.entries()) {
    const title = tasks.get(taskId).value();
    if (title) {
      createTaskDiv(taskId, title, tasks);
    }
  }
}

function tasksOnUpdated(taskId: string, tasks: PathObject<LiveMap<Tasks>>) {
  const title = tasks.get(taskId).value();
  if (!title) {
    return;
  }

  const taskSpan = document.querySelector(`.task[data-task-id="${taskId}"] > span`);
  if (taskSpan) {
    taskSpan.innerHTML = title;
  } else {
    createTaskDiv(taskId, title, tasks);
  }
}

function tasksOnRemoved(taskId: string) {
  document.querySelector(`.task[data-task-id="${taskId}"]`)?.remove();
}

function createTaskDiv(id: string, title: string, tasks: PathObject<LiveMap<Tasks>>) {
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

function addEventListenersToButtons(tasks: PathObject<LiveMap<Tasks>>) {
  addTaskButton.addEventListener('click', async () => {
    const taskTitle = taskInput.value.trim();
    if (!taskTitle) {
      return;
    }

    const taskId = nanoid();
    taskInput.value = '';
    await tasks.set(taskId, taskTitle);
  });

  removeAllTasksDiv.addEventListener('click', async () => {
    // Use batch to remove all tasks atomically
    tasks.batch((ctx) => {
      for (const [taskId] of tasks.entries()) {
        ctx.remove(taskId);
      }
    });
  });
}

main()
  .then()
  .catch((e) => console.error(e));
