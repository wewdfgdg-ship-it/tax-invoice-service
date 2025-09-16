import Container from '../src/components/ui/Container';
import Typography from '../src/components/ui/Typography';
import Button from '../src/components/ui/Button';
import Card from '../src/components/ui/Card';
import Link from '../src/components/ui/Link';

export default function Custom404() {
  return (
    <Container maxWidth="lg" padding="responsive" className="min-h-screen flex items-center justify-center">
      <Card variant="glass" padding="xl" className="text-center max-w-lg w-full">
        <div className="mb-6">
          <Typography variant="displayLarge" color="dark" className="mb-2">
            404
          </Typography>
          <Typography variant="h2" color="dark" className="mb-4">
            페이지를 찾을 수 없습니다
          </Typography>
        </div>
        
        <Typography variant="body" color="gray" className="mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          URL을 다시 확인해 주세요.
        </Typography>
        
        <div className="flex gap-4 justify-center">
          <Button 
            variant="primary" 
            size="md"
            onClick={() => window.history.back()}
          >
            이전 페이지로
          </Button>
          
          <Link href="/" variant="button">
            <Button variant="secondary" size="md">
              홈으로 가기
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Typography variant="caption" color="gray">
            도움이 필요하신가요?{' '}
            <Link href="/contact" variant="inline" color="primary">
              문의하기
            </Link>
          </Typography>
        </div>
      </Card>
    </Container>
  );
}
