import { useState, useEffect } from 'react';
import Link from '../components/ui/Link';
import Card from '../components/ui/Card';
import Typography from '../components/ui/Typography';
import Container from '../components/ui/Container';
import { Grid, GridItem } from '../components/ui/Grid';
import Badge from '../components/ui/Badge';
import Loader from '../components/ui/Loader';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Apple Style Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-[44px] bg-[rgba(22,22,23,0.8)] backdrop-blur-xl z-50">
        <Container maxWidth="lg" padding="responsive">
          <div className="flex items-center justify-between h-[44px]">
            <Link href="/" variant="nav" color="whiteAlpha">
              ← 홈으로
            </Link>
            <Typography variant="bodySmall" color="whiteAlpha">
              블로그
            </Typography>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="pt-[44px] pb-[88px] bg-gradient-to-b from-[rgb(245,245,247)] to-white">
        <Container maxWidth="lg" padding="responsive" className="py-[88px]">
          <Typography 
            variant="displayLarge" 
            color="dark"
            align="center"
            className="mb-6"
          >
            블로그
          </Typography>
          <Typography 
            variant="h4" 
            color="gray"
            align="center"
            weight="normal"
          >
            노션으로 작성한 콘텐츠를 쉽게 공유하세요
          </Typography>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-[88px]">
        <Container maxWidth="lg" padding="responsive">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader variant="spinner" size="lg" color="primary" text="포스트를 불러오는 중..." />
            </div>
          ) : error ? (
            <Card variant="bordered" padding="xl">
              <Typography variant="body" color="dark" align="center">
                에러가 발생했습니다: {error}
              </Typography>
            </Card>
          ) : posts.length === 0 ? (
            <Card variant="bordered" padding="xl">
              <Typography variant="body" color="gray" align="center">
                아직 작성된 포스트가 없습니다.
              </Typography>
            </Card>
          ) : (
            <Grid cols={12} gap="lg">
              {posts.map((post) => (
                <GridItem key={post.id} span={12} spanMd={6} spanLg={4}>
                  <Link 
                    href={`/blog/${post.slug}`}
                    variant="default"
                    className="block h-full"
                  >
                    <Card 
                      variant="hover" 
                      padding="none"
                      className="h-full overflow-hidden transition-all duration-240 hover:scale-[1.02]"
                    >
                      {/* Thumbnail */}
                      {post.thumbnail && (
                        <div className="aspect-[16/9] overflow-hidden bg-[rgb(245,245,247)]">
                          <img 
                            src={post.thumbnail} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="pill" color="primary" size="sm">
                            {post.category || '일반'}
                          </Badge>
                          <Typography variant="caption" color="gray">
                            {new Date(post.createdTime).toLocaleDateString('ko-KR')}
                          </Typography>
                        </div>
                        
                        <Typography 
                          variant="h3" 
                          color="dark"
                          className="mb-3 line-clamp-2"
                        >
                          {post.title}
                        </Typography>
                        
                        <Typography 
                          variant="body" 
                          color="gray"
                          className="line-clamp-3"
                        >
                          {post.excerpt}
                        </Typography>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="default" 
                                color="light" 
                                size="xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                </GridItem>
              ))}
            </Grid>
          )}
        </Container>
      </section>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .transition-all {
          transition: all 240ms cubic-bezier(0.4, 0, 0.6, 1);
        }
      `}</style>
    </>
  );
}