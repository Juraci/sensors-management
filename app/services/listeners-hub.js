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
  const index = listeners.findIndex((listener) => {
    return listener.getBoardId() === boardId;
  });
  if (index === -1) {
    return;
  }
  const removedClient = listeners.splice(index, 1)[0];
  removedClient.close();
};

export default { add, all, remove, reset };
