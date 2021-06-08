import {createBrowserHistory, History} from 'history';

export type ReadonlyBrowserHistory = Readonly<History>

const browserHistory: ReadonlyBrowserHistory = createBrowserHistory()

export default browserHistory