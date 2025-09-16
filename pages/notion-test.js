import { useState, useEffect } from 'react';

export default function NotionTest() {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    businessNumber: '',
    companyName: '',
    note: '',
  });

  // 데이터베이스 조회
  const fetchDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/notion/database');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 통계 조회
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/notion/database?type=stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const stats = await response.json();
      setStats(stats);
    } catch (err) {
      console.error('Stats error:', err);
    }
  };

  // 새 항목 생성
  const createItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/notion/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create');
      const result = await response.json();
      alert('항목이 생성되었습니다!');
      setFormData({ businessNumber: '', companyName: '', note: '' });
      fetchDatabase();
      fetchStats();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 상태 업데이트
  const updateStatus = async (businessNumber, status) => {
    try {
      const response = await fetch('/api/notion/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessNumber, status }),
      });
      if (!response.ok) throw new Error('Failed to update');
      alert('상태가 업데이트되었습니다!');
      fetchDatabase();
      fetchStats();
    } catch (err) {
      setError(err.message);
    }
  };

  // 항목 삭제
  const deleteItem = async (businessNumber) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const response = await fetch(`/api/notion/delete?businessNumber=${businessNumber}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      alert('삭제되었습니다!');
      fetchDatabase();
      fetchStats();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDatabase();
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>노션 API 테스트</h1>
      
      {/* 통계 */}
      {stats && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px',
          marginBottom: '20px' 
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>통계</h2>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div>전체: {stats.total}</div>
            <div>완료: {stats.completed}</div>
            <div>대기중: {stats.pending}</div>
            <div>오류: {stats.error}</div>
          </div>
        </div>
      )}

      {/* 새 항목 추가 폼 */}
      <div style={{ 
        padding: '15px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        marginBottom: '20px' 
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>새 항목 추가</h2>
        <form onSubmit={createItem}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="사업자번호"
              value={formData.businessNumber}
              onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
              required
              style={{ 
                padding: '8px', 
                width: '200px', 
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <input
              type="text"
              placeholder="회사명"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              style={{ 
                padding: '8px', 
                width: '200px',
                marginRight: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <input
              type="text"
              placeholder="비고"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              style={{ 
                padding: '8px', 
                width: '200px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#0071e3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '추가 중...' : '추가'}
          </button>
        </form>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee', 
          color: '#c00',
          borderRadius: '4px',
          marginBottom: '20px' 
        }}>
          에러: {error}
        </div>
      )}

      {/* 데이터 목록 */}
      <div>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
          데이터베이스 목록
          <button 
            onClick={fetchDatabase}
            style={{ 
              marginLeft: '10px',
              padding: '4px 8px',
              fontSize: '14px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            새로고침
          </button>
        </h2>
        
        {loading && <div>로딩 중...</div>}
        
        {data && data.length > 0 ? (
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            border: '1px solid #ddd'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                  사업자번호
                </th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                  회사명
                </th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                  상태
                </th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                  등록일
                </th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                  액션
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const businessNumber = item.properties['사업자번호']?.title?.[0]?.text?.content || '';
                const companyName = item.properties['회사명']?.rich_text?.[0]?.text?.content || '';
                const status = item.properties['상태']?.select?.name || '';
                const date = item.properties['등록일']?.date?.start || '';
                
                return (
                  <tr key={item.id}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      {businessNumber}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      {companyName}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      <select
                        value={status}
                        onChange={(e) => updateStatus(businessNumber, e.target.value)}
                        style={{ 
                          padding: '4px',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      >
                        <option value="대기중">대기중</option>
                        <option value="진행중">진행중</option>
                        <option value="완료">완료</option>
                        <option value="오류">오류</option>
                      </select>
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      {date ? new Date(date).toLocaleDateString('ko-KR') : ''}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                      <button
                        onClick={() => deleteItem(businessNumber)}
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          !loading && <div>데이터가 없습니다.</div>
        )}
      </div>
      
      {/* 안내 메시지 */}
      <div style={{ 
        marginTop: '40px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px'
      }}>
        <strong>⚠️ 노션 API 설정 필요</strong>
        <ol style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>노션에서 새 Integration 생성: https://www.notion.so/my-integrations</li>
          <li>생성된 Integration Token을 .env 파일의 NOTION_API_KEY에 입력</li>
          <li>노션에서 데이터베이스 생성 후 Integration 연결</li>
          <li>데이터베이스 ID를 .env 파일의 NOTION_DATABASE_ID에 입력</li>
          <li>서버 재시작 후 테스트</li>
        </ol>
      </div>
    </div>
  );
}