const About = () => {
    return (
        <div>
            {/* 회사 소개 헤더 */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">회사 소개</h1>
                        <p className="text-xl text-gray-600">
                            20년 이상의 노하우와 혁신으로 프랜차이즈 산업을 선도하는 기업입니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 회사 역사 */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">우리의 역사</h2>
                            <p className="text-gray-600 mb-4">
                                2003년 첫 매장을 오픈한 이래, 우리 브랜드는 지속적인 혁신과 품질 관리를 통해
                                프랜차이즈 산업의 선두주자로 자리매김했습니다.
                            </p>
                            <p className="text-gray-600 mb-4">
                                현재 전국 200개 이상의 가맹점을 운영하며, 매년 30% 이상의 성장률을 기록하고 있습니다.
                                우리의 성공 비결은 철저한 품질 관리와 가맹점과의 상생 경영에 있습니다.
                            </p>
                            <p className="text-gray-600">
                                앞으로도 끊임없는 연구개발과 혁신을 통해 고객과 가맹점 모두가 만족할 수 있는
                                최고의 프랜차이즈 브랜드로 성장해 나갈 것입니다.
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="회사 역사"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 미션과 비전 */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">미션과 비전</h2>
                        <p className="max-w-2xl mx-auto">
                            우리는 고객과 가맹점 모두의 성공을 위해 최선을 다합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-blue-700 p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">미션</h3>
                            <p className="text-blue-100 mb-4">
                                "최고의 품질과 서비스로 고객에게 만족을, 체계적인 시스템으로 가맹점에 성공을 제공한다."
                            </p>
                            <ul className="list-disc pl-5 text-blue-100 space-y-2">
                                <li>고객 만족을 최우선으로 생각합니다.</li>
                                <li>가맹점의 성공이 곧 우리의 성공입니다.</li>
                                <li>지속적인 혁신으로 시장을 선도합니다.</li>
                            </ul>
                        </div>

                        <div className="bg-blue-700 p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">비전</h3>
                            <p className="text-blue-100 mb-4">
                                "2030년까지 아시아 최고의 프랜차이즈 브랜드로 성장한다."
                            </p>
                            <ul className="list-disc pl-5 text-blue-100 space-y-2">
                                <li>2025년까지 국내 500개 매장 달성</li>
                                <li>2027년까지 아시아 주요 5개국 진출</li>
                                <li>2030년까지 글로벌 1,000개 매장 달성</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 경영진 소개 */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">경영진 소개</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            풍부한 경험과 전문성을 갖춘 경영진이 프랜차이즈 브랜드를 이끌고 있습니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CEO */}
                        <div className="text-center">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                                alt="CEO"
                                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold">김대표</h3>
                            <p className="text-blue-600 mb-2">CEO / 창립자</p>
                            <p className="text-gray-600 max-w-xs mx-auto">
                                20년 이상의 외식 산업 경험을 바탕으로 2003년 회사를 창립하였습니다.
                            </p>
                        </div>

                        {/* COO */}
                        <div className="text-center">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                                alt="COO"
                                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold">이운영</h3>
                            <p className="text-blue-600 mb-2">COO</p>
                            <p className="text-gray-600 max-w-xs mx-auto">
                                체계적인 운영 시스템 구축과 가맹점 지원 프로그램을 총괄하고 있습니다.
                            </p>
                        </div>

                        {/* CMO */}
                        <div className="text-center">
                            <img
                                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                                alt="CMO"
                                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold">박마케팅</h3>
                            <p className="text-blue-600 mb-2">CMO</p>
                            <p className="text-gray-600 max-w-xs mx-auto">
                                브랜드 전략 수립과 효과적인 마케팅 캠페인으로 브랜드 가치를 높이고 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 회사 연혁 */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">회사 연혁</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            지속적인 성장과 혁신의 역사를 소개합니다.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="border-l-4 border-blue-600 ml-4">
                            {/* 2003년 */}
                            <div className="relative pl-8 pb-8">
                                <div className="absolute -left-6 mt-2 rounded-full bg-blue-600 w-8 h-8 flex items-center justify-center text-white font-bold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">2003년</h3>
                                <p className="text-gray-600">회사 설립 및 첫 매장 오픈 (서울 강남)</p>
                            </div>

                            {/* 2007년 */}
                            <div className="relative pl-8 pb-8">
                                <div className="absolute -left-6 mt-2 rounded-full bg-blue-600 w-8 h-8 flex items-center justify-center text-white font-bold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">2007년</h3>
                                <p className="text-gray-600">전국 50개 매장 달성 및 프랜차이즈 대상 수상</p>
                            </div>

                            {/* 2012년 */}
                            <div className="relative pl-8 pb-8">
                                <div className="absolute -left-6 mt-2 rounded-full bg-blue-600 w-8 h-8 flex items-center justify-center text-white font-bold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">2012년</h3>
                                <p className="text-gray-600">중앙연구소 설립 및 신제품 개발 강화</p>
                            </div>

                            {/* 2016년 */}
                            <div className="relative pl-8 pb-8">
                                <div className="absolute -left-6 mt-2 rounded-full bg-blue-600 w-8 h-8 flex items-center justify-center text-white font-bold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">2016년</h3>
                                <p className="text-gray-600">전국 100개 매장 달성 및 해외 시장 진출 (중국, 베트남)</p>
                            </div>

                            {/* 2020년 */}
                            <div className="relative pl-8 pb-8">
                                <div className="absolute -left-6 mt-2 rounded-full bg-blue-600 w-8 h-8 flex items-center justify-center text-white font-bold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">2020년</h3>
                                <p className="text-gray-600">디지털 전환 가속화 및 온라인 주문 시스템 도입</p>
                            </div>

                            {/* 2023년 */}
                            <div className="relative pl-8">
                                <div className="absolute -left-6 mt-2 rounded-full bg-blue-600 w-8 h-8 flex items-center justify-center text-white font-bold">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">2023년</h3>
                                <p className="text-gray-600">전국 200개 매장 달성 및 ESG 경영 강화</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 