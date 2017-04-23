import EventEmitter from 'events';
import SseClient from '../../../app/services/sse-client';
import config from '../../../app/config/config';

describe('Sse client', () => {
  const boardId = '123123AB';
  const sensorId = 29;
  const Alert = {
    create: () => {},
  };

  describe('#constructor', () => {
    it('instantiates the EventSource with the given uri', () => {
      const expectedUri = `${config.sse}/cards/${boardId}/stream`;

      /*eslint-disable*/
      class EventSource {
        constructor(uri) {
          expect(uri).to.be.equal(expectedUri);
        }
      }

      new SseClient({boardId, sensorId, model: Alert }, EventSource);
      /*eslint-enable*/
    });
  });

  describe('#subscribe', () => {
    it('sends on message to the EventSource', () => {
      /*eslint-disable*/
      class EventSource {
        on() {}
      }
      /*eslint-enable*/

      const spy = sinon.spy(EventSource.prototype, 'on');

      const sseClient = new SseClient({ boardId, sensorId, model: Alert }, EventSource);
      sseClient.subscribe();
      expect(spy).to.have.been.calledWith('message');
    });
  });

  describe('#close', () => {
    it('sends close message to EventSource', () => {
      /*eslint-disable*/
      class EventSource {
        close() {}
      }
      /*eslint-enable*/

      const spy = sinon.spy(EventSource.prototype, 'close');

      const sseClient = new SseClient({ boardId, sensorId, model: Alert }, EventSource);
      sseClient.close();
      expect(spy).to.have.been.calledOnce;
    });
  });

  context('when the message event is emitted', () => {
    it('sends the create message to the model passed as argument', () => {
      /*eslint-disable*/
      class EventSource extends EventEmitter {}
      /*eslint-enable*/
      const e = { data: 'motion detected' };

      const spy = sinon.spy(Alert, 'create');

      const sseClient = new SseClient({ boardId, sensorId, model: Alert }, EventSource);
      sseClient.subscribe();
      sseClient.source.emit('message', e);
      expect(spy).to.have.been.calledWith({ SensorId: sensorId, message: e.data, seen: false });
    });
  });
});
