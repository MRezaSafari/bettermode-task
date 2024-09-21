import extractIdFromSlug from './post-param-extractor';

describe('extractIdFromSlug', () => {
  it('should return the last segment of the slug', () => {
    expect(extractIdFromSlug('post-title-12345')).toBe('12345');
    expect(extractIdFromSlug('category-name-67890')).toBe('67890');
  });

  it('should return the entire string if there is no hyphen', () => {
    expect(extractIdFromSlug('12345')).toBe('12345');
    expect(extractIdFromSlug('singleword')).toBe('singleword');
  });

  it('should handle strings with multiple hyphens correctly', () => {
    expect(extractIdFromSlug('this-is-a-long-title-54321')).toBe('54321');
    expect(extractIdFromSlug('another-example-with-more-words-98765')).toBe('98765');
  });

  it('should return an empty string if the slug ends with a hyphen', () => {
    expect(extractIdFromSlug('ends-with-hyphen-')).toBe('');
  });

  it('should return an empty string if the slug is an empty string', () => {
    expect(extractIdFromSlug('')).toBe('');
  });
});
