import { useState } from 'react';
import Button from '../src/components/ui/Button';
import Card from '../src/components/ui/Card';
import Typography from '../src/components/ui/Typography';
import Container from '../src/components/ui/Container';
import Loader from '../src/components/ui/Loader';
import Badge from '../src/components/ui/Badge';

export default function NotionDatabaseTest() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);

  // 모든 포스트 가져오기
  const fetchAllPosts = async () => {
    setLoading(true);
    setError(null);
    setPosts(null);
    setSelectedPost(null);
    
    try {
      const response = await fetch('/api/blog/database-posts');
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.posts);
      } else {
        throw new Error(data.error || 'Failed to fetch posts');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 특정 포스트 가져오기
  const fetchPostBySlug = async (slug) => {
    setLoading(true);
    setError(null);
    setSelectedPost(null);
    
    try {
      const response = await fetch(`/api/blog/database-posts?slug=${slug}`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedPost(data.post);
      } else {
        throw new Error(data.error || 'Failed to fetch post');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" padding="responsive" className="py-20">
      <Typography variant="display" color="dark" className="mb-8">
        노션 데이터베이스 테스트
      </Typography>

      <Card variant="bordered" padding="lg" className="mb-8">
        <Typography variant="h4" color="dark" className="mb-4">
          데이터베이스 정보
        </Typography>
        <Typography variant="body" color="gray" className="mb-2">
          데이터베이스 ID: 26cbdffa378b80b2a2c7ce91a1126bd7
        </Typography>
        <Typography variant="body" color="gray">
          URL: https://www.notion.so/26cbdffa378b80b2a2c7ce91a1126bd7
        </Typography>
      </Card>

      <div className="flex gap-4 mb-8">
        <Button 
          variant="primary" 
          size="md" 
          onClick={fetchAllPosts}
          disabled={loading}
        >
          모든 포스트 가져오기
        </Button>
      </div>

      {loading && (
        <Loader variant="spinner" size="md" color="primary" text="로딩 중..." />
      )}

      {error && (
        <Card variant="bordered" padding="lg" className="mb-4 border-red-300 bg-red-50">
          <Typography variant="body" color="dark">
            ❌ 에러: {error}
          </Typography>
        </Card>
      )}

      {/* 포스트 목록 */}
      {posts && (
        <Card variant="bordered" padding="lg" className="mb-8">
          <Typography variant="h4" color="dark" className="mb-4">
            포스트 목록 ({posts.length}개)
          </Typography>
          
          {posts.length === 0 ? (
            <Typography variant="body" color="gray">
              발행된 포스트가 없습니다.
            </Typography>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} variant="flat" padding="default">
                  <div className="flex justify-between items-start mb-2">
                    <Typography variant="h5" color="dark">
                      {post.title}
                    </Typography>
                    <Badge variant="default" color={post.published ? 'success' : 'secondary'} size="sm">
                      {post.published ? '발행됨' : '초안'}
                    </Badge>
                  </div>
                  
                  {post.excerpt && (
                    <Typography variant="body" color="gray" className="mb-2">
                      {post.excerpt}
                    </Typography>
                  )}
                  
                  <div className="flex items-center gap-4 mb-3">
                    <Typography variant="caption" color="gray">
                      Slug: {post.slug}
                    </Typography>
                    {post.category && (
                      <Badge variant="pill" color="primary" size="xs">
                        {post.category}
                      </Badge>
                    )}
                    {post.publishedDate && (
                      <Typography variant="caption" color="gray">
                        {new Date(post.publishedDate).toLocaleDateString('ko-KR')}
                      </Typography>
                    )}
                  </div>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="default" color="light" size="xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => fetchPostBySlug(post.slug)}
                  >
                    상세 보기
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* 선택된 포스트 상세 */}
      {selectedPost && (
        <Card variant="bordered" padding="lg">
          <Typography variant="h3" color="dark" className="mb-4">
            {selectedPost.title}
          </Typography>
          
          <div className="flex items-center gap-4 mb-4">
            {selectedPost.category && (
              <Badge variant="pill" color="primary">
                {selectedPost.category}
              </Badge>
            )}
            {selectedPost.publishedDate && (
              <Typography variant="body" color="gray">
                {new Date(selectedPost.publishedDate).toLocaleDateString('ko-KR')}
              </Typography>
            )}
            <Typography variant="body" color="gray">
              작성자: {selectedPost.author}
            </Typography>
          </div>
          
          {selectedPost.excerpt && (
            <Card variant="flat" padding="default" className="mb-4">
              <Typography variant="body" color="gray">
                {selectedPost.excerpt}
              </Typography>
            </Card>
          )}
          
          {selectedPost.htmlContent ? (
            <div className="prose max-w-none">
              <Typography variant="h5" color="dark" className="mb-3">
                콘텐츠:
              </Typography>
              <div 
                className="notion-content"
                dangerouslySetInnerHTML={{ __html: selectedPost.htmlContent }}
              />
            </div>
          ) : (
            <Typography variant="body" color="gray" className="mt-4">
              콘텐츠가 없습니다.
            </Typography>
          )}
          
          {selectedPost.tags && selectedPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedPost.tags.map(tag => (
                <Badge key={tag} variant="default" color="light">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </Card>
      )}

      <style jsx>{`
        .notion-content {
          line-height: 1.8;
        }
        .notion-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.5rem 0;
        }
        .notion-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0;
        }
        .notion-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0;
        }
        .notion-content p {
          margin: 1rem 0;
        }
        .notion-content ul,
        .notion-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .notion-content li {
          margin: 0.5rem 0;
        }
        .notion-content blockquote {
          margin: 1.5rem 0;
          padding-left: 1rem;
          border-left: 3px solid #e5e5e5;
          color: #666;
        }
        .notion-content pre {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .notion-content code {
          background: #f5f5f5;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-family: monospace;
        }
        .notion-content pre code {
          background: transparent;
          padding: 0;
        }
        .notion-content img {
          max-width: 100%;
          height: auto;
          margin: 1.5rem 0;
          border-radius: 8px;
        }
        .notion-content hr {
          margin: 2rem 0;
          border: none;
          border-top: 1px solid #e5e5e5;
        }
      `}</style>
    </Container>
  );
}