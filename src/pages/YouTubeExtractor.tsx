import { useEffect, useState } from 'react';
import { initYouTubeAuth, isAuthenticated, logout } from '../utils/youtubeAuth';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface Playlist {
  id: string;
  title: string;
  itemCount: number;
}

export default function YouTubeExtractor() {
  const [message, setMessage] = useState('');
  const [extractedLinks, setExtractedLinks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);

  useEffect(() => {
    setAuthStatus(isAuthenticated());
  }, []);

  const fetchPlaylists = async () => {
    if (!authStatus) return;

    setIsLoadingPlaylists(true);
    try {
      const accessToken = localStorage.getItem('youtube_access_token');
      if (!accessToken) {
        setError('인증 토큰이 없습니다. 다시 로그인해주세요.');
        return;
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=50&key=${API_KEY}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('재생목록을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      const formattedPlaylists = data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        itemCount: item.contentDetails.itemCount,
      }));
      setPlaylists(formattedPlaylists);
    } catch (err) {
      console.error('Error fetching playlists:', err);
      setError('재생목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoadingPlaylists(false);
    }
  };

  useEffect(() => {
    if (authStatus) {
      fetchPlaylists();
    }
  }, [authStatus]);

  const extractLinks = () => {
    const urlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/g;
    const matches = message.match(urlRegex) || [];
    
    const uniqueLinks = [...new Set(matches)];
    setExtractedLinks(uniqueLinks);
    setError(null);
  };

  const handleUpdatePlaylist = async () => {
    if (!authStatus) {
      setError('재생목록을 업데이트하려면 로그인이 필요합니다.');
      return;
    }

    if (!selectedPlaylistId) {
      setError('재생목록을 선택해주세요.');
      return;
    }

    if (!extractedLinks.length) {
      setError('추출된 링크가 없습니다.');
      return;
    }

    try {
      const accessToken = localStorage.getItem('youtube_access_token');
      if (!accessToken) {
        setError('인증 토큰이 없습니다. 다시 로그인해주세요.');
        return;
      }

      const videoIds = extractedLinks.map(link => {
        const url = new URL(link);
        if (url.hostname === 'youtu.be') {
          return url.pathname.slice(1);
        }
        return new URLSearchParams(url.search).get('v');
      }).filter(Boolean);

      const total = videoIds.length;
      let completed = 0;

      for (const videoId of videoIds) {
        try {
          const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${API_KEY}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              snippet: {
                playlistId: selectedPlaylistId,
                resourceId: {
                  kind: 'youtube#video',
                  videoId: videoId
                }
              }
            })
          });

          if (!response.ok) {
            const error = await response.json();
            console.error(`Error adding video ${videoId}:`, error);
            if (error.error?.code === 401) {
              setError('인증이 만료되었습니다. 다시 로그인해주세요.');
              logout();
              return;
            }
            continue;
          }

          completed++;
          setError(`진행 중: ${completed}/${total}`);
        } catch (err) {
          console.error(`Error adding video ${videoId}:`, err);
        }
      }

      setError(null);
      alert(`${completed}개의 동영상이 재생목록에 추가되었습니다!`);
    } catch (err) {
      console.error('Error updating playlist:', err);
      setError('재생목록 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube 링크 추출기</h1>
      
      {!authStatus ? (
        <button
          onClick={initYouTubeAuth}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Google 로그인
        </button>
      ) : (
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      )}

      {authStatus && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">재생목록 선택:</h2>
          {isLoadingPlaylists ? (
            <p>재생목록을 불러오는 중...</p>
          ) : (
            <select
              value={selectedPlaylistId}
              onChange={(e) => setSelectedPlaylistId(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">재생목록을 선택하세요</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.title} ({playlist.itemCount}개 동영상)
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <div className="mt-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="카카오톡 메시지를 여기에 붙여넣으세요"
          className="w-full h-32 p-2 border rounded"
        />
        <button
          onClick={extractLinks}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          링크 추출
        </button>
      </div>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {extractedLinks.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">추출된 링크:</h2>
          <ul className="list-disc pl-5">
            {extractedLinks.map((link, index) => (
              <li key={index} className="mb-1">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpdatePlaylist}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            재생목록 업데이트
          </button>
        </div>
      )}
    </div>
  );
} 