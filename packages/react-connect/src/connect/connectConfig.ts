import createConnect, { useFeatureContext } from './createConnect';

/**
 * Used to connect to MJS Configuration for the particular module and pass it down
 */
export const hook = useFeatureContext;
export const connect = createConnect({ field: 'config' }).connect;
