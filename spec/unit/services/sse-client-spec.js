import SseClient from '../../../app/services/sse-client';
import config from '../../../app/config/config';

describe('Sse client', () => {
  const boardId = '123123AB';

  describe('#constructor', () => {
    it('instantiates the EventSource with the given uri', () => {
      const expectedUri = `${config.sse}/cards/${boardId}/stream`;

      class EventSource {
        constructor(uri) {
          expect(uri).to.be.equal(expectedUri);
        }
      }

      new SseClient(boardId, EventSource);
    });
  });

  describe('#subscribe', () => {
    it('sends on message to the EventSource', () => {
      class EventSource {
        on() {}
      }

      const spy = sinon.spy(EventSource.prototype, 'on');

      const sseClient = new SseClient(boardId, EventSource);
      sseClient.subscribe();
      expect(spy).to.have.been.calledWith('message');
    });
  });

  describe('#close', () => {
    it('sends close message to EventSource', () => {
      class EventSource {
        close() {}
      }

      const spy = sinon.spy(EventSource.prototype, 'close');

      const sseClient = new SseClient(boardId, EventSource);
      sseClient.close();
      expect(spy).to.have.been.calledOnce;
    });
  });
});
