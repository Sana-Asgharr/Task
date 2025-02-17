import axios from 'axios';
import {API} from './';
import {API_URL} from './config';

export function generatePostLink(postId) {
  return `${API_URL().replace(/\/$/, '')}/post/${postId}`;
}

