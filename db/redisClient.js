const { promisify } = require("util");
const redis = require("redis");

// Insert the below config / options when starting from docker / docker-compose
const redisClient = process.env.REDIS_LOCAL_DEV
  ? redis.createClient()
  : redis.createClient({ host: "redis-server", port: 6379 });

const redisClientGetAsync = promisify(redisClient.get).bind(redisClient);
const redisClientSetAsync = promisify(redisClient.set).bind(redisClient);
const redisClientSetExAsync = promisify(redisClient.setex).bind(redisClient);

module.exports = {
  redisClientGetAsync,
  redisClientSetAsync,
  redisClientSetExAsync,
};
