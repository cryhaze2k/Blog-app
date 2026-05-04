const Post = require('../models/Post');
// Імітуємо модель Post, щоб не звертатися до реальної бази MongoDB
jest.mock('../models/Post');

describe('Unit Test: Post Logic (Controller)', () => {
    it('має повертати список постів (імітація)', async () => {
        const mockPosts = [{ title: 'Post 1', content: 'Content 1' }];
        
        // Програмуємо наш Mock: коли викликається find(), поверни mockPosts
        Post.find = jest.fn().mockResolvedValue(mockPosts);

        const posts = await Post.find();
        
        expect(posts).toHaveLength(1);
        expect(posts[0].title).toBe('Post 1');
        expect(Post.find).toHaveBeenCalledTimes(1);
    });
});