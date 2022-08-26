import { ArticlePreview } from '@/components/ArticlePreview';
const ReactTestRenderer = require('react-test-renderer');

describe('Article Preview', () => {
  it('renders correctly', () => {
    const tree = ReactTestRenderer.create(<ArticlePreview />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
