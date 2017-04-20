import listenersHub from '../../../app/services/listeners-hub';

describe('ListenersHub', () => {
  beforeEach(() => listenersHub.reset());

  describe('#add', () => {
    it('sends subscribe message to the sse client instance', () => {
      const sseClient = {
        subscribe: () => {},
      };

      const spy = sinon.spy(sseClient, 'subscribe');
      listenersHub.add(sseClient);
      expect(spy).to.have.been.calledOnce;
      expect(listenersHub.all()).to.have.length(1);
    });
  });

  describe('#remove', () => {
    it('sends close message the sse client instance with the given boardId and removes it from the collection', () => {
      const sseClientA = {
        subscribe: () => {},
        close: () => {},
        getBoardId: () => '666',
      };

      const sseClientB = {
        subscribe: () => {},
        close: () => {},
        getBoardId: () => '777',
      };

      const spy = sinon.spy(sseClientA, 'close');
      listenersHub.add(sseClientA);
      listenersHub.add(sseClientB);
      listenersHub.remove('666');
      expect(spy).to.have.been.calledOnce;
      expect(listenersHub.all()).to.have.length(1);
    });

    context('when the sse client is not found in the collection', () => {
      it('should not break', () => {
        expect(() => {
          listenersHub.remove('777');
        }).to.not.throw(/Cannot read property 'close' of undefined/);
      });
    });
  });
});

