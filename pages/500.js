import Container from '../src/components/ui/Container';
import Typography from '../src/components/ui/Typography';
import Button from '../src/components/ui/Button';
import Card from '../src/components/ui/Card';

export default function Custom500() {
  return (
    <Container maxWidth="lg" padding="responsive" className="min-h-screen flex items-center justify-center">
      <Card variant="glass" padding="xl" className="text-center max-w-lg w-full">
        <div className="mb-6">
          <Typography variant="displayLarge" color="dark" className="mb-2">
            500
          </Typography>
          <Typography variant="h2" color="dark" className="mb-4">
            서버 오류가 발생했습니다
          </Typography>
        </div>
        
        <Typography variant="body" color="gray" className="mb-8">
          일시적인 문제가 발생했습니다.
          잠시 후 다시 시도해 주세요.
        </Typography>
        
        <div className="flex gap-4 justify-center">
          <Button 
            variant="primary" 
            size="md"
            onClick={() => window.location.reload()}
          >
            새로고침
          </Button>
          
          <Button 
            variant="secondary" 
            size="md"
            onClick={() => window.location.href = '/'}
          >
            홈으로 가기
          </Button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Typography variant="caption" color="gray">
            문제가 지속되면 관리자에게 문의해 주세요.
          </Typography>
        </div>
      </Card>
    </Container>
  );
}
