import { createClient } from 'webdav';

export const getClient = (username: string, password: string) => {
  return createClient(import.meta.env['VITE_WEBDAV_DOMAIN'], {
    username: username,
    password: password,
  });
};
