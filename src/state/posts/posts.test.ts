import { Action } from 'redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from './actions';
import reducer from './reducer';
import { PostActionTypes } from './types';

import { emptyAction } from '../../test-utils';

// https://jsonplaceholder.typicode.com/posts/1
const demoPost = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
};

// https://jsonplaceholder.typicode.com/posts/1/comments
const demoComments = [
  {
    postId: 1,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
  },
  {
    postId: 1,
    id: 2,
    name: 'quo vero reiciendis velit similique earum',
    email: 'Jayne_Kuhic@sydney.com',
    body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
  },
  {
    postId: 1,
    id: 3,
    name: 'odio adipisci rerum aut animi',
    email: 'Nikita@garfield.biz',
    body: 'quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione',
  },
  {
    postId: 1,
    id: 4,
    name: 'alias odio sit',
    email: 'Lew@alysha.tv',
    body: 'non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati',
  },
  {
    postId: 1,
    id: 5,
    name: 'vero eaque aliquid doloribus et culpa',
    email: 'Hayden@althea.biz',
    body: 'harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et',
  },
];

/* ------------ Actions ------------ */

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Post actions', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeAll(() => {
    store = mockStore({
      loading: {},
      error: {},
      posts: {},
    });
  });

  const testPostID = '1';

  it('sends get post action correctly', () => store.dispatch(actions.getPost(testPostID) as any).then(() => {
    const actionHistory = store.getActions();
    expect(actionHistory[0]).toEqual(actions.getPostRequest());
    expect(actionHistory[1]).toEqual(actions.getPostSuccess(testPostID));
  }));

  it('catches post server error correctly', () => store.dispatch(actions.getPost() as any).catch(() => {
    const actionHistory = store.getActions();
    expect(actionHistory[0]).toEqual(actions.getPostRequest());
    expect(actionHistory[1]).toEqual(actions.getPostFailure('Test Failure Message'));
  }));

  it('sends get comments action correctly', () => store.dispatch(actions.getComments(testPostID) as any).then(() => {
    const actionHistory = store.getActions();
    expect(actionHistory[0]).toEqual(actions.getCommentsRequest());
    expect(actionHistory[1]).toEqual(actions.getCommentsSuccess(testPostID));
  }));

  it('catches missing post id correctly', () => store.dispatch(actions.getComments() as any).catch(() => {
    const actionHistory = store.getActions();
    expect(actionHistory[0]).toEqual(actions.getCommentsRequest());
    expect(actionHistory[1]).toEqual(actions.getCommentsFailure('No post id included'));
  }));

  it('catches comments server error correctly', () => store.dispatch(actions.getComments(testPostID) as any).catch(() => {
    const actionHistory = store.getActions();
    expect(actionHistory[0]).toEqual(actions.getCommentsRequest());
    expect(actionHistory[1]).toEqual(actions.getCommentsFailure('Test Failure Message'));
  }));
});

/* ------------ Reducer ------------ */

const initialReducerState = {
  post: {},
  comments: [],
};

describe('Post reducer', () => {
  it('initializes with correct initial state', () => {
    expect(reducer(initialReducerState, emptyAction))
      .toEqual({ post: {}, comments: [] });
  });

  it('loads post correctly', () => {
    expect(reducer(initialReducerState, { type: PostActionTypes.FETCH_POST_SUCCESS, payload: demoPost }))
      .toEqual({ post: demoPost, comments: [] });
  });

  it('loads comments correctly', () => {
    expect(reducer({ post: demoPost, comments: [] }, { type: PostActionTypes.FETCH_COMMENTS_SUCCESS, payload: demoComments }))
      .toEqual({ post: demoPost, comments: demoComments });
  });

  it('does not load comments if post is empty', () => {
    expect(reducer(initialReducerState, { type: PostActionTypes.FETCH_COMMENTS_SUCCESS, payload: demoComments }))
      .toEqual(initialReducerState);
  });

  it('clears post and comments correctly', () => {
    expect(reducer({ post: demoPost, comments: demoComments }, { type: PostActionTypes.CLEAR_POST_SUCCESS }))
      .toEqual(initialReducerState);
  });

  it('clears comments from post correctly', () => {
    expect(reducer({ post: demoPost, comments: demoComments }, { type: PostActionTypes.CLEAR_COMMENTS_SUCCESS }))
      .toEqual({ post: demoPost, comments: [] });
  });
});
