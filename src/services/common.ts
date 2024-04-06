import { request } from '@/utils/request';

export const getResourceInfo = () => {
  return request({
    url: `/leaseAuth/server/api/auth/account/getResourceInfo`,
    method: 'POST',
  });
};
