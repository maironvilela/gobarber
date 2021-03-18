import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis'

  config: {
    redis: RedisOptions,
  }
}

export default {
  config: {
    redis: {
      host: 'localhost',
      port: 6379,
      password: undefined,
      username: undefined

    }
  }

} as ICacheConfig;
