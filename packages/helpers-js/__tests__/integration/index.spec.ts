import * as expect from 'expect';
import * as fauxJax from 'faux-jax';
import keys = require('lodash/keys');
import values = require('lodash/values');
import times = require('lodash/times');
import * as specs from './specs';

const key = 'testKey';
const user = {
  uid: 'testUserId',
  sid: 'testSessionId',
};

values(specs).forEach((spec: any) => {
  describe(spec.name, () => {
    beforeEach(() => {
      fauxJax.install();
    });

    afterEach(() => {
      fauxJax.restore();
    });

    describe('generic', () => {
      it('should return store instance', () => {
        const store = spec.createStore({ key, user });

        expect(keys(store)).toEqual(['emit', 'subscribe', 'get']);
      });

      it('should not throw when all required params are passed', () => {
        expect(() => spec.createStore({ key })).toNotThrow();
      });

      it('should not throw when all params are passed', () => {
        expect(() =>
          spec.createStore({
            key,
            user,
            method: 'post',
            log: true,
          }),
        ).toNotThrow();
      });

      it('should throw an Error if configuration is not provided', () => {
        expect(() => spec.createStore()).toThrow(
          /Please, provide configuration object/,
        );
      });

      it('should throw an Error if "key" param is not provided at config', () => {
        expect(() => spec.createStore({})).toThrow(/"key" param is required/);
      });

      it('should throw an Error if "user.uid" param is not provided at config', () => {
        expect(() =>
          spec.createStore({
            key,
            user: {
              sid: 'testSessionId',
            },
          }),
        ).toThrow(/"user.uid" param is required/);
      });

      it('should throw an Error if "user.sid" param is not provided at config', () => {
        expect(() =>
          spec.createStore({
            key,
            user: {
              uid: 'testUserId',
            },
          }),
        ).toThrow(/"user.sid" param is required/);
      });
    });

    describe('store', () => {
      describe('emit', () => {
        it('should throw an Error if event is not provided', () => {
          const store = spec.createStore({ key, user });

          expect(() => store.emit()).toThrow(
            /Please, provide event you want to emit/,
          );
        });

        it('should throw an Error if event "name" is not provided', () => {
          const store = spec.createStore({ key, user });

          expect(() => store.emit({})).toThrow(/Please, provide event "name"/);
        });

        it('should not throw an Error if "user" param was passed on library init', () => {
          const store = spec.createStore({ key, user });

          expect(() =>
            store.emit(spec.events.validEvent).emit(spec.events.requestEvent),
          ).toNotThrow();
        });

        it('should not throw an Error if "user" param was passed at "request" event', () => {
          const store = spec.createStore({ key });
          // check that user is sending to server
          // test user overriding case

          expect(() =>
            store
              .emit(spec.events.validEvent)
              .emit(extendRequestEvent(spec.events.requestEvent, { user })),
          ).toNotThrow();
        });

        it('should throw an Error if "user.uid" param is not provided at "request" event', () => {
          const store = spec.createStore({ key });

          expect(() =>
            store.emit(spec.events.validEvent).emit(
              extendRequestEvent(spec.events.requestEvent, {
                user: {
                  sid: 'testSessionId',
                },
              }),
            ),
          ).toThrow(/"user.uid" param is required/);
        });

        it('should throw an Error if "user.sid" param is not provided at "request" event', () => {
          const store = spec.createStore({ key });

          expect(() =>
            store.emit(spec.events.validEvent).emit(
              extendRequestEvent(spec.events.requestEvent, {
                user: {
                  uid: 'testUserId',
                },
              }),
            ),
          ).toThrow(/"user.sid" param is required/);
        });

        it(`should throw an Error if "user" param is not provided
          neither at configuration nor at "request" event`, () => {
          const store = spec.createStore({ key });

          expect(() =>
            store.emit(spec.events.validEvent).emit(spec.events.requestEvent),
          ).toThrow(
            /`user` param should be provided either at request or at library config/,
          );
        });

        it('should return store object instance', () => {
          const store = spec.createStore({ key, user });

          expect(store.emit(spec.events.validEvent)).toEqual(store);
        });

        it(`should send request to ${spec.searchApi
          .endpoint} endpoint`, done => {
          const store = spec.createStore({ key, user });

          fauxJax.on('request', req => {
            const regex = new RegExp(spec.searchApi.endpoint);
            expect(req.requestURL).toMatch(regex);
            done();
          });

          store.emit(spec.events.validEvent).emit(spec.events.requestEvent);
        });

        spec.emit.validations.forEach(v => {
          const event = JSON.stringify(v.event);

          it(`should throw an Error if ${event} was dispatched`, () => {
            const store = spec.createStore({ key, user });
            expect(() => store.emit(v.event)).toThrow(v.message);
          });
        });

        spec.emit.requests.forEach(r => {
          const reqBodyStr = JSON.stringify(r.requestBody);
          const eventsStr = JSON.stringify(r.events);

          it(`should send ${reqBodyStr} request body if ${eventsStr} events are emitted`, done => {
            const store = spec.createStore({ key, user });

            fauxJax.on('request', req => {
              // use searchApi assertions if future
              const wholeRequestBody = JSON.parse(req.requestBody);

              if (typeof r.requestBody === 'function') {
                r.requestBody(wholeRequestBody);
              } else {
                expect(wholeRequestBody).toContain(r.requestBody);
              }

              done();
            });

            r.events.forEach(store.emit);
          });
        });
      });

      describe('subscribe', () => {
        it('should throw an Error if listener function is not provided', () => {
          const store = spec.createStore({ key, user });

          expect(() => store.subscribe()).toThrow(
            /Please, provide listener function/,
          );
        });

        it('should throw an Error if listener param is not a function', () => {
          const store = spec.createStore({ key, user });

          expect(() => store.subscribe('')).toThrow(
            /Listener should be a function/,
          );
        });

        it('should return function to unsubscribe from store', () => {
          const store = spec.createStore({ key, user });
          const spy = expect.createSpy();
          const unsubscribe = store.subscribe(spy);

          unsubscribe();

          store.emit(spec.events.validEvent);

          expect(spy.calls.length).toEqual(0);
        });

        spec.subscribe.successEvents.forEach((event: any) => {
          const payloadText = event.payload
            ? ` with ${JSON.stringify(event)} payload`
            : '';

          if (event.name === 'request') {
            it(
              `should notify listeners twise, when "request" event was emitted${payloadText}` +
                ` and server responded with success`,
              done => {
                const store = spec.createStore({ key, user });
                const spy = expect.createSpy();

                fauxJax.on('request', req => {
                  req.respond(
                    200,
                    {
                      'Content-Type': 'application/json',
                    },
                    JSON.stringify(spec.searchApi.successResponse),
                  );
                });

                // get rid of setTimeout
                setTimeout(() => {
                  expect(spy.calls.length).toBe(3);
                  expect(spy.calls[0].arguments).toEqual([
                    spec.events.validEvent,
                  ]);
                  expect(spy.calls[1].arguments).toEqual([event]);
                  expect(spy.calls[2].arguments).toEqual([
                    {
                      name: 'responseSuccess',
                    },
                  ]);
                  unsubscribe();
                  done();
                }, 100);

                const unsubscribe = store.subscribe(spy);
                store.emit(spec.events.validEvent).emit(event);
              },
            );
          } else {
            it(`should notify the listeners when ${event.name} event was emitted${payloadText}`, () => {
              const store = spec.createStore({ key, user });
              const spy = expect.createSpy();

              const usubuscribe = store.subscribe(spy);
              store.emit(event);

              expect(spy.calls.length).toEqual(1);
              expect(spy.calls[0].arguments).toEqual([event]);
              usubuscribe();
            });
          }
        });
      });

      describe('get', () => {
        spec.get.forEach(n => {
          const eventsText = n.events
            ? ` after emitting "${JSON.stringify(n.events)}" events`
            : '';
          const resultText =
            typeof n.result === 'undefined'
              ? 'undefined'
              : JSON.stringify(n.result);

          it(`should return ${resultText} when trying to get "${n.name}"`, done => {
            const store = spec.createStore({ key, user });
            const hasRequest =
              n.events &&
              n.events.filter(event => event.name === 'request').length > 0;
            const check = () => {
              if (typeof n.result !== 'function') {
                expect(store.get(n.name)).toEqual(n.result);
              } else {
                n.result(store.get(n.name));
              }
              done();
            };

            if (n.successResponse && hasRequest) {
              fauxJax.on('request', req => {
                req.respond(
                  200,
                  {
                    'Content-Type': 'application/json',
                  },
                  JSON.stringify(n.successResponse),
                );
              });
            }

            if (n.events) {
              n.events.forEach(store.emit);
            }

            if (hasRequest) {
              const unsubscribe = store.subscribe(event => {
                if (event.name === 'responseSuccess') {
                  unsubscribe();
                  check();
                }
              });
            } else {
              check();
            }
          });
        });
      });
    });
  });
});

function extendRequestEvent(requestEvent, payload) {
  return {
    ...requestEvent,
    payload: {
      ...requestEvent.payload,
      ...payload,
    },
  };
}
