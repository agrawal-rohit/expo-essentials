// eslint-disable-next-line import/no-cycle
import client from './client';

const checkUserStatus = () => client.get('/auth/status');

export default {
  checkUserStatus,
};
