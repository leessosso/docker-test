interface YouTubeVideo {
  title: string;
  url: string;
}

export class YouTubePlaylistManager {
  private apiKey: string;
  private playlistId: string;

  constructor(apiKey: string, playlistId: string) {
    this.apiKey = apiKey;
    this.playlistId = playlistId;
  }

  private getVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  private async deleteAllVideosFromPlaylist(): Promise<void> {
    try {
      // 재생목록의 모든 항목 가져오기
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=id&playlistId=${this.playlistId}&maxResults=50&key=${this.apiKey}`
      );
      const data = await response.json();

      if (data.items) {
        // 각 항목 삭제
        for (const item of data.items) {
          await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?id=${item.id}&key=${this.apiKey}`,
            { method: 'DELETE' }
          );
        }
      }
    } catch (error) {
      console.error('재생목록 비우기 실패:', error);
      throw error;
    }
  }

  private async addVideoToPlaylist(videoId: string): Promise<void> {
    try {
      await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            snippet: {
              playlistId: this.playlistId,
              resourceId: {
                kind: 'youtube#video',
                videoId: videoId,
              },
            },
          }),
        }
      );
    } catch (error) {
      console.error('비디오 추가 실패:', error);
      throw error;
    }
  }

  async updatePlaylist(videos: YouTubeVideo[]): Promise<void> {
    try {
      // 기존 재생목록 비우기
      await this.deleteAllVideosFromPlaylist();

      // 새로운 비디오 추가
      for (const video of videos) {
        const videoId = this.getVideoId(video.url);
        if (videoId) {
          await this.addVideoToPlaylist(videoId);
        }
      }
    } catch (error) {
      console.error('재생목록 업데이트 실패:', error);
      throw error;
    }
  }
} 