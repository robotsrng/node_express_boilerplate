
import rateLimit from 'express-rate-limit';

export const baseLimiter = rateLimit({
    max: 100,
    windowMs: 10000, // 10 seconds
    message: "You can't make any more requests at the moment. Try again later",
});

