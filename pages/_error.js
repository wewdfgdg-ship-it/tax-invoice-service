import Container from '../src/components/ui/Container';
import Typography from '../src/components/ui/Typography';
import Button from '../src/components/ui/Button';
import Card from '../src/components/ui/Card';

function Error({ statusCode }) {
  return (
    <Container maxWidth="lg" padding="responsive" className="min-h-screen flex items-center justify-center">
      <Card variant="bordered" padding="xl" className="text-center max-w-md w-full">
        <Typography variant="display" color="dark" className="mb-4">
          {statusCode === 404 ? '404' : statusCode || '오류'}
        </Typography>
        
        <Typography variant="h3" color="dark" className="mb-2">
          {statusCode === 404 
            ? '페이지를 찾을 수 없습니다' 
            : '오류가 발생했습니다'}
        </Typography>
        
        <Typography variant="body" color="gray" className="mb-6">
          {statusCode === 404
            ? '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.'
            : statusCode 
              ? `${statusCode} 오류가 발생했습니다.`
              : '클라이언트 오류가 발생했습니다.'}
        </Typography>
        
        <Button 
          variant="primary" 
          size="md"
          onClick={() => window.location.href = '/'}
        >
          홈으로 돌아가기
        </Button>
      </Card>
    </Container>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
