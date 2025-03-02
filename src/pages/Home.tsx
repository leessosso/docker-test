import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* 히어로 섹션 */}
            <section className="relative bg-blue-600 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
                <div className="relative container mx-auto px-4 py-24 md:py-32">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">최고의 프랜차이즈 브랜드와 함께 성공적인 사업을 시작하세요</h1>
                        <p className="text-xl mb-8">
                            20년 이상의 노하우와 체계적인 시스템으로 여러분의 성공적인 창업을 지원합니다.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/franchise" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-center">
                                가맹 안내 보기
                            </Link>
                            <Link to="/contact" className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold text-center">
                                문의하기
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 브랜드 소개 섹션 */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">우리 브랜드의 강점</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            차별화된 제품과 서비스, 체계적인 운영 시스템으로 가맹점의 성공을 지원합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">차별화된 제품</h3>
                            <p className="text-gray-600">
                                독자적인 레시피와 엄선된 재료로 만든 제품으로 고객의 만족도를 높입니다.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">체계적인 시스템</h3>
                            <p className="text-gray-600">
                                20년 이상의 노하우를 바탕으로 한 체계적인 운영 시스템을 제공합니다.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg text-center">
                            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">지속적인 지원</h3>
                            <p className="text-gray-600">
                                개업 이후에도 지속적인 교육과 마케팅 지원으로 가맹점의 성장을 돕습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 성공 사례 섹션 */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">성공 사례</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            우리 브랜드와 함께 성공한 가맹점들의 이야기를 들어보세요.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* 성공 사례 카드 1 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="성공 사례 1"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">서울 강남점</h3>
                                <p className="text-gray-600 mb-4">
                                    "체계적인 시스템과 본사의 지속적인 지원으로 개업 6개월 만에 월 매출 3천만원을 달성했습니다."
                                </p>
                                <p className="text-gray-500 text-sm">김영수 점주님</p>
                            </div>
                        </div>

                        {/* 성공 사례 카드 2 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="성공 사례 2"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">부산 해운대점</h3>
                                <p className="text-gray-600 mb-4">
                                    "차별화된 제품과 마케팅 지원으로 지역 내 인지도를 빠르게 높일 수 있었습니다."
                                </p>
                                <p className="text-gray-500 text-sm">박지영 점주님</p>
                            </div>
                        </div>

                        {/* 성공 사례 카드 3 */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="성공 사례 3"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">대전 둔산점</h3>
                                <p className="text-gray-600 mb-4">
                                    "초보 창업자였지만 본사의 체계적인 교육으로 안정적인 운영이 가능했습니다."
                                </p>
                                <p className="text-gray-500 text-sm">이민호 점주님</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">지금 바로 프랜차이즈 사업을 시작하세요</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        체계적인 시스템과 지속적인 지원으로 여러분의 성공적인 창업을 함께 하겠습니다.
                    </p>
                    <Link to="/contact" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold inline-block">
                        상담 신청하기
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home; 