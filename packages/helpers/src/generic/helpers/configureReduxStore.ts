import * as Redux from 'redux';
import createSagaMiddleware from 'redux-saga';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  Redux.compose;

declare const window: {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
};

function configureReduxStore(rootReducer, rootSaga) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware].filter(Boolean);

  const store = Redux.createStore(
    rootReducer,
    undefined,
    composeEnhancers(Redux.applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export { configureReduxStore };
