import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Typography from '../components/ui/Typography';
import Container from '../components/ui/Container';
import Loader from '../components/ui/Loader';

export default function BlogTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testPost1 = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/api/blog/post/post-1');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testPost2 = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/api/blog/post/post-2');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" padding="responsive" className="py-20">
      <Typography variant="display" color="dark" className="mb-8">
        노션 블로그 테스트
      </Typography>

      <div className="flex gap-4 mb-8">
        <Button 
          variant="primary" 
          size="md" 
          onClick={testPost1}
          disabled={loading}
        >
          첫 번째 포스트 테스트
        </Button>
        
        <Button 
          variant="primary" 
          size="md" 
          onClick={testPost2}
          disabled={loading}
        >
          두 번째 포스트 테스트
        </Button>
      </div>

      {loading && (
        <Loader variant="spinner" size="md" color="primary" text="로딩 중..." />
      )}

      {error && (
        <Card variant="bordered" padding="lg" className="mb-4">
          <Typography variant="body" color="dark">
            에러: {error}
          </Typography>
        </Card>
      )}

      {result && (
        <Card variant="bordered" padding="lg">
          <Typography variant="h3" color="dark" className="mb-4">
            결과:
          </Typography>
          
          {result.title && (
            <div className="mb-4">
              <Typography variant="h4" color="dark">
                제목: {result.title}
              </Typography>
            </div>
          )}
          
          {result.headings && result.headings.length > 0 && (
            <div className="mb-4">
              <Typography variant="h5" color="dark" className="mb-2">
                목차 (TOC):
              </Typography>
              <ul className="pl-4">
                {result.headings.map((heading, index) => (
                  <li key={index} className={`ml-${heading.level * 4}`}>
                    <Typography variant="body" color="gray">
                      {heading.text}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {result.content && (
            <div className="mb-4">
              <Typography variant="h5" color="dark" className="mb-2">
                콘텐츠 미리보기:
              </Typography>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: result.content.substring(0, 500) + '...' 
                }}
              />
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t">
            <Typography variant="caption" color="gray">
              디버그 정보:
            </Typography>
            <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </Card>
      )}

      <div className="mt-8">
        <Card variant="flat" padding="lg">
          <Typography variant="h4" color="dark" className="mb-4">
            📋 설정 체크리스트
          </Typography>
          
          <ul className="space-y-2">
            <li>
              <Typography variant="body" color="gray">
                ✅ 노션 페이지 ID 설정 완료 (post-1, post-2)
              </Typography>
            </li>
            <li>
              <Typography variant="body" color="gray">
                ⚠️ .env 파일에 NOTION_API_KEY 설정 필요
              </Typography>
            </li>
            <li>
              <Typography variant="body" color="gray">
                ⚠️ 노션 페이지에 Integration 연결 필요
              </Typography>
            </li>
          </ul>
          
          <div className="mt-4 pt-4 border-t">
            <Typography variant="bodySmall" color="gray">
              접속 URL:
            </Typography>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="/blog/post-1" className="text-blue-500 hover:underline">
                  /blog/post-1 - 첫 번째 포스트
                </a>
              </li>
              <li>
                <a href="/blog/post-2" className="text-blue-500 hover:underline">
                  /blog/post-2 - 두 번째 포스트
                </a>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </Container>
  );
}