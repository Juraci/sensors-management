let listeners = [];

const all = () => listeners;

const add = (sseClient) => {
  sseClient.subscribe();
  listeners.push(sseClient);
};

const reset = () => {
  listeners = [];
};

const remove = (boardId) => {
  const index = listeners.findIndex(listener => listener.getBoardId() === boardId);
  const removedClient = listeners.splice(index, 1)[0];
  if (removedClient) {
    removedClient.close();
  }
};

export default { add, all, remove, reset };
