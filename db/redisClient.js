const { promisify } = require("util");
const redis = require("redis");

const redisClient = redis.createClient({ host: "redis-server", port: 6379 });

const redisClientGetAsync = promisify(redisClient.get).bind(redisClient);
const redisClientSetAsync = promisify(redisClient.set).bind(redisClient);
const redisClientSetExAsync = promisify(redisClient.setex).bind(redisClient);

module.exports = {
  redisClientGetAsync,
  redisClientSetAsync,
  redisClientSetExAsync,
};
