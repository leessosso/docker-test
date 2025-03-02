import { useState } from 'react';

const Stores = () => {
    // 지역별 매장 데이터
    const storeData = {
        서울: [
            { id: 1, name: '강남점', address: '서울특별시 강남구 테헤란로 123', phone: '02-1234-5678', openDate: '2018-05-15' },
            { id: 2, name: '홍대점', address: '서울특별시 마포구 와우산로 123', phone: '02-2345-6789', openDate: '2019-03-20' },
            { id: 3, name: '명동점', address: '서울특별시 중구 명동길 123', phone: '02-3456-7890', openDate: '2017-11-10' },
            { id: 4, name: '여의도점', address: '서울특별시 영등포구 여의대로 123', phone: '02-4567-8901', openDate: '2020-01-15' },
            { id: 5, name: '잠실점', address: '서울특별시 송파구 올림픽로 123', phone: '02-5678-9012', openDate: '2021-07-22' },
        ],
        경기: [
            { id: 6, name: '분당점', address: '경기도 성남시 분당구 불정로 123', phone: '031-1234-5678', openDate: '2019-08-15' },
            { id: 7, name: '수원점', address: '경기도 수원시 팔달구 인계로 123', phone: '031-2345-6789', openDate: '2020-05-10' },
            { id: 8, name: '일산점', address: '경기도 고양시 일산동구 중앙로 123', phone: '031-3456-7890', openDate: '2021-02-28' },
        ],
        부산: [
            { id: 9, name: '해운대점', address: '부산광역시 해운대구 해운대로 123', phone: '051-1234-5678', openDate: '2019-12-20' },
            { id: 10, name: '서면점', address: '부산광역시 부산진구 서면로 123', phone: '051-2345-6789', openDate: '2020-11-15' },
        ],
        대구: [
            { id: 11, name: '동성로점', address: '대구광역시 중구 동성로 123', phone: '053-1234-5678', openDate: '2021-04-10' },
        ],
        인천: [
            { id: 12, name: '송도점', address: '인천광역시 연수구 송도미래로 123', phone: '032-1234-5678', openDate: '2021-09-05' },
        ],
        광주: [
            { id: 13, name: '충장로점', address: '광주광역시 동구 충장로 123', phone: '062-1234-5678', openDate: '2022-01-20' },
        ],
        대전: [
            { id: 14, name: '둔산점', address: '대전광역시 서구 둔산로 123', phone: '042-1234-5678', openDate: '2022-03-15' },
        ],
        제주: [
            { id: 15, name: '제주시점', address: '제주특별자치도 제주시 중앙로 123', phone: '064-1234-5678', openDate: '2022-06-10' },
        ],
    };

    // 현재 선택된 지역
    const [selectedRegion, setSelectedRegion] = useState('서울');

    // 지역 선택 핸들러
    const handleRegionChange = (region: string) => {
        setSelectedRegion(region);
    };

    return (
        <div>
            {/* 매장 안내 헤더 */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">매장 안내</h1>
                        <p className="text-xl text-gray-600">
                            전국 각지에 위치한 프랜차이즈 매장을 소개합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 매장 검색 및 목록 */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {/* 지역 선택 탭 */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex space-x-2 min-w-max">
                            {Object.keys(storeData).map((region) => (
                                <button
                                    key={region}
                                    onClick={() => handleRegionChange(region)}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${selectedRegion === region
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {region} ({storeData[region as keyof typeof storeData].length})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 매장 목록 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {storeData[selectedRegion as keyof typeof storeData].map((store) => (
                            <div key={store.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
                                    <div className="text-gray-600 space-y-2">
                                        <p className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span>{store.address}</span>
                                        </p>
                                        <p className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                            <span>{store.phone}</span>
                                        </p>
                                        <p className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <span>오픈일: {new Date(store.openDate).toLocaleDateString('ko-KR')}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <a
                                            href={`https://map.kakao.com/link/search/${store.address}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                        >
                                            <span>지도 보기</span>
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 매장 통계 */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">매장 현황</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            전국적으로 확장하고 있는 우리 브랜드의 매장 현황입니다.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">
                                            {Object.values(storeData).flat().length}
                                        </div>
                                        <div className="text-gray-600">총 매장 수</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">
                                            {Object.keys(storeData).length}
                                        </div>
                                        <div className="text-gray-600">진출 지역 수</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">
                                            {new Date().getFullYear() - 2003}년+
                                        </div>
                                        <div className="text-gray-600">브랜드 역사</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                                        <div className="text-gray-600">가맹점 만족도</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 신규 매장 소식 */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">신규 매장 소식</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            새롭게 오픈한 매장을 소개합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="신규 매장 1"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2">NEW</div>
                                <h3 className="text-xl font-semibold mb-2">제주시점</h3>
                                <p className="text-gray-600 mb-4">
                                    제주도의 아름다운 경관과 함께 즐길 수 있는 매장이 새롭게 오픈했습니다.
                                </p>
                                <p className="text-gray-500 text-sm">오픈일: 2022년 6월 10일</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
                                alt="신규 매장 2"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2">NEW</div>
                                <h3 className="text-xl font-semibold mb-2">둔산점</h3>
                                <p className="text-gray-600 mb-4">
                                    대전 둔산동의 중심 상권에 위치한 매장이 새롭게 오픈했습니다.
                                </p>
                                <p className="text-gray-500 text-sm">오픈일: 2022년 3월 15일</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
                                alt="신규 매장 3"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2">NEW</div>
                                <h3 className="text-xl font-semibold mb-2">충장로점</h3>
                                <p className="text-gray-600 mb-4">
                                    광주 충장로의 핫플레이스에 위치한 매장이 새롭게 오픈했습니다.
                                </p>
                                <p className="text-gray-500 text-sm">오픈일: 2022년 1월 20일</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 매장 찾기 안내 */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">가까운 매장을 찾으세요?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        전국 어디서나 우리 브랜드의 매장을 만나보세요.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a
                            href="tel:02-1234-5678"
                            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            전화 문의
                        </a>
                        <a
                            href="mailto:info@franchise.com"
                            className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            이메일 문의
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Stores; 