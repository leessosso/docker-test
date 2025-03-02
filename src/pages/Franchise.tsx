import { Link } from 'react-router-dom';

const Franchise = () => {
    return (
        <div>
            {/* 프랜차이즈 헤더 */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">프랜차이즈 안내</h1>
                        <p className="text-xl text-gray-600">
                            체계적인 시스템과 지속적인 지원으로 성공적인 창업을 도와드립니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 프랜차이즈 장점 */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">프랜차이즈 장점</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            20년 이상의 노하우와 체계적인 시스템으로 가맹점의 성공을 지원합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="flex items-start mb-4">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">검증된 브랜드</h3>
                                    <p className="text-gray-600">
                                        20년 이상의 역사와 200개 이상의 매장을 통해 검증된 브랜드 파워를 제공합니다.
                                        소비자들에게 이미 인정받은 브랜드로 초기 고객 확보가 용이합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="flex items-start mb-4">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">체계적인 교육</h3>
                                    <p className="text-gray-600">
                                        매장 운영에 필요한 모든 교육을 체계적으로 제공합니다.
                                        제품 제조부터 서비스, 매장 관리, 직원 교육까지 전문적인 노하우를 전수합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="flex items-start mb-4">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">마케팅 지원</h3>
                                    <p className="text-gray-600">
                                        전국 단위의 브랜드 마케팅과 지역 맞춤형 마케팅 지원을 제공합니다.
                                        SNS, 온라인 광고, 프로모션 등 다양한 마케팅 활동을 통해 매출 증대를 지원합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <div className="flex items-start mb-4">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">지속적인 관리</h3>
                                    <p className="text-gray-600">
                                        개업 이후에도 지속적인 운영 관리와 슈퍼바이저의 정기적인 방문을 통해 매장 운영을 지원합니다.
                                        매출 분석, 품질 관리, 서비스 개선 등 지속적인 성장을 위한 컨설팅을 제공합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 창업 절차 */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">창업 절차</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            상담 신청부터 오픈까지, 체계적인 절차로 성공적인 창업을 지원합니다.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                                <h3 className="text-xl font-semibold mb-2">상담 신청</h3>
                                <p className="text-gray-600">
                                    홈페이지, 전화, 이메일을 통해 가맹 상담을 신청합니다.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                                <h3 className="text-xl font-semibold mb-2">사업 설명회</h3>
                                <p className="text-gray-600">
                                    브랜드 소개, 창업 비용, 수익성 등에 대한 상세한 설명을 듣습니다.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                                <h3 className="text-xl font-semibold mb-2">점포 선정</h3>
                                <p className="text-gray-600">
                                    입지 분석 전문가와 함께 최적의 점포를 선정합니다.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                                <h3 className="text-xl font-semibold mb-2">계약 체결</h3>
                                <p className="text-gray-600">
                                    가맹 계약을 체결하고 가맹비를 납부합니다.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">5</div>
                                <h3 className="text-xl font-semibold mb-2">인테리어 공사</h3>
                                <p className="text-gray-600">
                                    브랜드 매뉴얼에 따라 인테리어 공사를 진행합니다.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">6</div>
                                <h3 className="text-xl font-semibold mb-2">교육 및 오픈</h3>
                                <p className="text-gray-600">
                                    점주 및 직원 교육 후 그랜드 오픈을 진행합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 창업 비용 */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">창업 비용</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            투명한 창업 비용 안내로 예비 창업자의 계획적인 창업을 돕습니다.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
                                        <th className="py-4 px-6 text-left">항목</th>
                                        <th className="py-4 px-6 text-right">비용 (VAT 별도)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-4 px-6 text-left">가맹비</td>
                                        <td className="py-4 px-6 text-right">1,000만원</td>
                                    </tr>
                                    <tr className="border-b bg-gray-50">
                                        <td className="py-4 px-6 text-left">교육비</td>
                                        <td className="py-4 px-6 text-right">300만원</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-4 px-6 text-left">인테리어 (33㎡ 기준)</td>
                                        <td className="py-4 px-6 text-right">3,500만원 ~ 4,500만원</td>
                                    </tr>
                                    <tr className="border-b bg-gray-50">
                                        <td className="py-4 px-6 text-left">간판 및 사인물</td>
                                        <td className="py-4 px-6 text-right">500만원 ~ 700만원</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-4 px-6 text-left">주방 설비</td>
                                        <td className="py-4 px-6 text-right">1,500만원 ~ 2,000만원</td>
                                    </tr>
                                    <tr className="border-b bg-gray-50">
                                        <td className="py-4 px-6 text-left">초도 물품</td>
                                        <td className="py-4 px-6 text-right">500만원 ~ 700만원</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-4 px-6 text-left">기타 비용</td>
                                        <td className="py-4 px-6 text-right">300만원 ~ 500만원</td>
                                    </tr>
                                    <tr className="bg-blue-100">
                                        <td className="py-4 px-6 text-left font-bold">총 예상 비용</td>
                                        <td className="py-4 px-6 text-right font-bold">7,600만원 ~ 9,700만원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-500 mt-4 text-sm text-center">
                            * 상기 비용은 예상 비용으로, 점포 위치 및 크기, 임대 조건 등에 따라 달라질 수 있습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">지금 바로 창업 상담을 신청하세요</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        체계적인 시스템과 지속적인 지원으로 여러분의 성공적인 창업을 함께 하겠습니다.
                    </p>
                    <Link to="/contact" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold inline-block">
                        창업 상담 신청하기
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Franchise; 