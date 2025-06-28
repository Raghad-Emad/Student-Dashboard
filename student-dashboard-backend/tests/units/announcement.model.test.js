const Announcement = require('../../models/announcement_model');

describe('Announcement Model', () => {
  it('should require a title and content', () => {
    const ann = new Announcement({});

    ann.validate((err) => {
      expect(err.errors.title).toBeDefined();
      expect(err.errors.content).toBeDefined();
    });
  });
});
