import React, { useState, useMemo } from 'react';

const LunchRoulette: React.FC = () => {
  const [menuInput, setMenuInput] = useState<string>('');
  const [menuList, setMenuList] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // 메뉴 개수에 따라 섹터 각도 계산 (useMemo로 최적화)
  const sectorAngles = useMemo(() => {
    if (menuList.length === 0) return [];
    const totalMenus = menuList.length;
    
    // 메뉴가 1개일 때는 전체 원을 그리기 위해 특별 처리
    if (totalMenus === 1) {
      return [{
        startAngle: 0,
        endAngle: 359.99, // 360도와 0도가 같아지는 것을 방지하기 위해 359.99도 사용
        sweepAngle: 359.99
      }];
    }

    const baseAngle = 360 / totalMenus;
    
    return menuList.map((_, index) => {
      const startAngle = index * baseAngle;
      const endAngle = (index + 1) * baseAngle;
      
      return {
        startAngle,
        endAngle,
        sweepAngle: baseAngle
      };
    });
  }, [menuList]);

  // 섹터 색상 고정 (useMemo로 최적화)
  const sectorColors = useMemo(() => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
      '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#1ABC9C'
    ];
    return menuList.map((_, index) => colors[index % colors.length]);
  }, [menuList]);

  const addMenu = () => {
    if (menuInput.trim() && !menuList.includes(menuInput.trim())) {
      setMenuList([...menuList, menuInput.trim()]);
      setMenuInput('');
    }
  };

  const removeMenu = (menuToRemove: string) => {
    setMenuList(menuList.filter(menu => menu !== menuToRemove));
  };

  const spinRoulette = () => {
    if (menuList.length === 0) return;

    setIsSpinning(true);

    // 추가 랜덤 회전 각도 (2~3바퀴)
    const additionalRotation = Math.floor(Math.random() * (1080 - 720 + 1)) + 720;
    
    setRotationAngle(prevAngle => prevAngle + additionalRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, 3500);
  };

  // 극좌표계 기반 섹터 생성
  const createSectorPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const startRad = startAngle * Math.PI / 180;
    const endRad = endAngle * Math.PI / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // 섹터 중앙 좌표 계산
  const calculateSectorCenterPoint = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const midAngle = (startAngle + endAngle) / 2;
    const midRad = midAngle * Math.PI / 180;
    
    // 섹터 중앙에서 약간 안쪽으로 (반지름의 2/3 지점)
    const x = centerX + (radius * 2/3) * Math.cos(midRad);
    const y = centerY + (radius * 2/3) * Math.sin(midRad);

    return { x, y };
  };

  return (
    <div>
                  <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">점심 메뉴 룰렛</h1>
                        <p className="text-xl text-gray-600">
                            메뉴를 추가하고 룰렛을 돌려보세요!
                        </p>
                    </div>
                </div>
            </section>

      <div className="mb-4">
        <div className="flex">
          <input 
            type="text" 
            value={menuInput}
            onChange={(e) => setMenuInput(e.target.value)}
            placeholder="메뉴 입력" 
            className="flex-grow p-2 border rounded-l-lg"
            onKeyPress={(e) => e.key === 'Enter' && addMenu()}
            disabled={isSpinning}
          />
          <button 
            onClick={addMenu} 
            disabled={isSpinning}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            추가
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">메뉴 목록:</h2>
        <div className="flex flex-wrap gap-2">
          {menuList.map((menu, index) => (
            <div 
              key={menu} 
              className="px-3 py-1 rounded-full flex items-center text-white"
              style={{ backgroundColor: sectorColors[index] }}
            >
              {menu}
              <button 
                onClick={() => removeMenu(menu)}
                disabled={isSpinning}
                className="ml-2 text-black hover:text-gray-800 disabled:text-gray-400"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-4 relative">
        <div 
          className={`w-64 h-64 rounded-full border-8 border-blue-500 
                      flex items-center justify-center relative overflow-hidden`}
          style={{ 
            transform: `rotate(${rotationAngle}deg)`,
            transition: isSpinning ? 'transform 3.5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
          }}
        >
          {menuList.length > 0 ? (
            <svg 
              viewBox="0 0 200 200" 
              className="absolute inset-0"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {menuList.map((menu, index) => {
                const { startAngle, endAngle } = sectorAngles[index];
                const sectorCenterPoint = calculateSectorCenterPoint(100, 100, 100, startAngle, endAngle);
                
                return (
                  <g key={menu}>
                    <path 
                      d={createSectorPath(100, 100, 100, startAngle, endAngle)}
                      fill={sectorColors[index]}
                    />
                    <text
                      x={sectorCenterPoint.x}
                      y={sectorCenterPoint.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${(startAngle + endAngle) / 2 + 90}, ${sectorCenterPoint.x}, ${sectorCenterPoint.y})`}
                      fill="white"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      {menu}
                    </text>
                  </g>
                );
              })}
            </svg>
          ) : (
            <div className="text-gray-500">메뉴 추가</div>
          )}
        </div>
        
        {/* 포인터 위치 수정 */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-4 h-4 bg-red-500 z-10"
          style={{
            clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
            transform: 'translateY(-2px)',
          }}
        ></div>
      </div>

      <button 
        onClick={spinRoulette} 
        disabled={menuList.length <= 1 || isSpinning}
        className="w-full bg-green-500 text-white p-3 rounded-lg 
                   hover:bg-green-600 disabled:bg-gray-300"
      >
        {isSpinning ? '돌리는 중...' : '룰렛 돌리기'}
      </button>

      {selectedMenu && !isSpinning && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">오늘의 점심 메뉴:</h2>
          <p className="text-2xl text-green-600 font-bold animate-bounce">{selectedMenu}</p>
        </div>
      )}
    </div>
  );
};

export default LunchRoulette; 