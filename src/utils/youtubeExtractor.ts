interface YouTubeLink {
  title: string;
  url: string;
}

export const extractYouTubeLinks = (text: string): YouTubeLink[] => {
  const lines = text.split('\n');
  const links: YouTubeLink[] = [];
  
  let currentTitle = '';
  
  lines.forEach(line => {
    // 제목 라인 확인 (숫자로 시작하는 라인)
    if (/^\d+\./.test(line)) {
      currentTitle = line.replace(/^\d+\.\s*/, '').trim();
    }
    
    // 유튜브 링크 확인
    const youtubeMatch = line.match(/(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (youtubeMatch && currentTitle) {
      const videoId = youtubeMatch[4];
      const url = `https://www.youtube.com/watch?v=${videoId}`;
      links.push({ title: currentTitle, url });
    }
  });
  
  return links;
}; 