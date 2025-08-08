import { LiveMap, LiveMapType, LiveMapUpdate, MapLocationObject, Realtime } from 'ably';
import Objects from 'ably/objects';
import { nanoid } from 'nanoid';
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

  // initialize default state
  await root.default({
    tasks: LiveMap.struct(),
  });

  subscribeToTasks(root);
  addEventListenersToButtons(root);
}

function subscribeToTasks(root: MapLocationObject) {
  // next type assertion won't be needed with user provided typings support for LocationObject
  const tasks = root.get('tasks') as MapLocationObject;

  // use Location API to subscribe to the tasks map. no need to handle instance management, as Location API will do it for us.
  tasks.subscribe(({ update }) => {
    tasksDiv.innerHTML = '';

    // next type assertion won't be needed with user provided typings support for LocationObject
    Object.entries(update as LiveMapUpdate<LiveMapType>).forEach(async ([taskId, change]) => {
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

  // set the initial values for tasks
  for (const [taskId, value] of tasks.entries()) {
    // next type assertion won't be needed with user provided typings support for LocationObject
    createTaskDiv({ id: taskId, title: value as string }, tasks);
  }
}

function tasksOnUpdated(taskId: string, tasks: MapLocationObject) {
  const taskSpan = document.querySelector(`.task[data-task-id="${taskId}"] > span`);
  // next type assertion won't be needed with user provided typings support for LocationObject
  const title = tasks.get(taskId).value() as string;
  if (taskSpan) {
    taskSpan.innerHTML = title;
  } else {
    createTaskDiv({ id: taskId, title }, tasks);
  }
}

function tasksOnRemoved(taskId: string) {
  document.querySelector(`.task[data-task-id="${taskId}"]`)?.remove();
}

function createTaskDiv(task: { id: string; title: string }, tasks: MapLocationObject) {
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

function addEventListenersToButtons(root: MapLocationObject) {
  addTaskButton.addEventListener('click', async () => {
    const taskTitle = taskInput.value.trim();
    if (!taskTitle) {
      return;
    }

    const taskId = nanoid();
    taskInput.value = '';
    // next type assertion won't be needed with user provided typings support for LocationObject
    await (root.get('tasks') as MapLocationObject).set(taskId, taskTitle);
  });

  removeAllTasksDiv.addEventListener('click', async () => {
    await root.set('tasks', LiveMap.struct());
  });
}

main()
  .then()
  .catch((e) => console.error(e));
