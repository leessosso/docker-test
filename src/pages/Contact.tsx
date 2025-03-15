import { useState, FormEvent } from 'react';

const Contact = () => {
    // 폼 데이터 상태
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        region: '',
        budget: '',
        experience: '',
        message: '',
        privacy: false
    });

    // 제출 상태
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 입력 필드 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '문의 접수 중 오류가 발생했습니다.');
            }

            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                region: '',
                budget: '',
                experience: '',
                message: '',
                privacy: false
            });

            // 3초 후 성공 메시지 숨기기
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : '문의 접수 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* 문의하기 헤더 */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">문의하기</h1>
                        <p className="text-xl text-gray-600">
                            프랜차이즈 창업에 관한 궁금한 점이 있으시면 언제든지 문의해 주세요.
                        </p>
                    </div>
                </div>
            </section>

            {/* 문의 폼 */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* 문의 폼 */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6">창업 상담 신청</h2>

                                {isSubmitted && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                                        <p>문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.</p>
                                    </div>
                                )}

                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                        <p>{error}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">이름 *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">이메일 *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">연락처 *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="region" className="block text-gray-700 font-medium mb-2">희망 지역</label>
                                            <select
                                                id="region"
                                                name="region"
                                                value={formData.region}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">선택해주세요</option>
                                                <option value="서울">서울</option>
                                                <option value="경기">경기</option>
                                                <option value="인천">인천</option>
                                                <option value="부산">부산</option>
                                                <option value="대구">대구</option>
                                                <option value="광주">광주</option>
                                                <option value="대전">대전</option>
                                                <option value="기타">기타</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">예상 창업 비용</label>
                                            <select
                                                id="budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">선택해주세요</option>
                                                <option value="8000만원 이하">8,000만원 이하</option>
                                                <option value="8000만원~1억원">8,000만원~1억원</option>
                                                <option value="1억원~1억5천만원">1억원~1억5천만원</option>
                                                <option value="1억5천만원 이상">1억5천만원 이상</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">창업 경험</label>
                                        <select
                                            id="experience"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">선택해주세요</option>
                                            <option value="없음">없음</option>
                                            <option value="1년 미만">1년 미만</option>
                                            <option value="1~3년">1~3년</option>
                                            <option value="3년 이상">3년 이상</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">문의 내용</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        ></textarea>
                                    </div>

                                    <div className="mb-6">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="privacy"
                                                checked={formData.privacy}
                                                onChange={handleChange}
                                                className="mr-2"
                                                required
                                            />
                                            <span className="text-gray-700">개인정보 수집 및 이용에 동의합니다. *</span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? '제출 중...' : '상담 신청하기'}
                                    </button>
                                </form>
                            </div>

                            {/* 연락처 정보 */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6">연락처 정보</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">전화 문의</h3>
                                            <p className="text-gray-600 mb-1">02-123-4567</p>
                                            <p className="text-gray-500 text-sm">평일 09:00 - 18:00 (주말, 공휴일 휴무)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">이메일 문의</h3>
                                            <p className="text-gray-600 mb-1">info@franchise.com</p>
                                            <p className="text-gray-500 text-sm">24시간 접수 가능, 영업일 기준 1-2일 내 답변</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">방문 상담</h3>
                                            <p className="text-gray-600 mb-1">서울특별시 강남구 테헤란로 123</p>
                                            <p className="text-gray-500 text-sm">사전 예약 필수 (전화 또는 이메일로 예약)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 지도 */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4">오시는 길</h3>
                                    <div className="rounded-lg overflow-hidden h-64">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3567382994506!2d127.02863231531017!3d37.49942997981131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15aee9ab0cb%3A0x31793fc63e0cf9d3!2z7YWM7Zqp66Oo7JWI7JuQ!5e0!3m2!1sko!2skr!4v1645521345678!5m2!1sko!2skr"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            title="회사 위치"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ 섹션 */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">자주 묻는 질문</h2>

                        <div className="space-y-4">
                            <details className="bg-white p-6 rounded-lg shadow-md">
                                <summary className="font-semibold text-lg cursor-pointer">창업 비용은 얼마인가요?</summary>
                                <div className="mt-4 text-gray-600">
                                    <p>창업 비용은 매장 위치, 크기, 임대 조건 등에 따라 달라질 수 있습니다. 일반적으로 33㎡(10평) 기준으로 약 7,600만원~9,700만원 정도가 소요됩니다. 자세한 내용은 프랜차이즈 페이지의 창업 비용 안내를 참고해 주세요.</p>
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-lg shadow-md">
                                <summary className="font-semibold text-lg cursor-pointer">교육은 어떻게 진행되나요?</summary>
                                <div className="mt-4 text-gray-600">
                                    <p>교육은 본사 교육장에서 2주간 진행됩니다. 제품 제조, 서비스, 매장 관리, 직원 교육 등 매장 운영에 필요한 모든 내용을 체계적으로 교육합니다. 또한 오픈 전 1주일간 매장에서 실전 교육도 함께 진행됩니다.</p>
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-lg shadow-md">
                                <summary className="font-semibold text-lg cursor-pointer">점포 선정은 어떻게 하나요?</summary>
                                <div className="mt-4 text-gray-600">
                                    <p>본사의 입지 분석 전문가가 상권 분석을 통해 최적의 점포 위치를 선정하는 데 도움을 드립니다. 유동인구, 경쟁 매장, 접근성 등을 종합적으로 분석하여 성공 가능성이 높은 위치를 추천해 드립니다.</p>
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-lg shadow-md">
                                <summary className="font-semibold text-lg cursor-pointer">계약 기간은 얼마인가요?</summary>
                                <div className="mt-4 text-gray-600">
                                    <p>기본 계약 기간은 3년이며, 계약 만료 시 양측의 합의에 따라 재계약이 가능합니다. 재계약 시에는 가맹비가 할인되며, 인테리어 리뉴얼 지원 등의 혜택이 제공됩니다.</p>
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-lg shadow-md">
                                <summary className="font-semibold text-lg cursor-pointer">로열티는 얼마인가요?</summary>
                                <div className="mt-4 text-gray-600">
                                    <p>월 매출의 3%를 로열티로 납부하며, 이는 브랜드 마케팅, 신제품 개발, 가맹점 지원 등에 사용됩니다. 오픈 후 3개월간은 로열티가 면제되어 초기 안정화를 지원합니다.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact; 