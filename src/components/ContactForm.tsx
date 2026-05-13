import { useState, useRef, useCallback, useEffect } from 'react';

interface ContactFormProps {
  formspreeId: string;
  phoneDisplay: string;
  phoneHref: string;
}

interface FormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  electricityServices: string[];
  waterServices: string[];
}

interface FormErrors {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  service?: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const FIELDS = [
  { key: 'name' as const, label: 'お名前', type: 'text', placeholder: '例：山田 花子', autoComplete: 'name' },
  { key: 'address' as const, label: 'ご住所', type: 'text', placeholder: '例：大阪府大阪市中央区大阪城1-1', autoComplete: 'street-address' },
  { key: 'phone' as const, label: '電話番号', type: 'text', placeholder: '例：0000-000-000', autoComplete: 'tel' },
  { key: 'email' as const, label: 'メールアドレス', type: 'email', placeholder: '例：example@setsubit.jp', autoComplete: 'email' },
] as const;

const ELECTRICITY_OPTIONS = [
  'ブレーカートラブル', 'コンセントトラブル', '照明トラブル', 'アンテナ工事', '給湯器交換',
];

const WATER_OPTIONS = [
  'トイレトラブル', 'キッチントラブル', 'お風呂トラブル', '洗面所トラブル',
];

function validateField(key: keyof FormData, value: string | string[], otherServices?: string[]): string | undefined {
  if (key === 'electricityServices' || key === 'waterServices') return undefined;

  if (typeof value === 'string' && !value.trim()) {
    const labels: Record<string, string> = {
      name: 'お名前',
      address: 'ご住所',
      phone: '電話番号',
      email: 'メールアドレス',
    };
    return `${labels[key]}を入力してください`;
  }

  if (key === 'email' && typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return '正しいメールアドレスを入力してください';
  }

  if (key === 'phone' && typeof value === 'string') {
    const stripped = value.replace(/[\s\-+()ー]/g, '');
    if (!/^[\d０-９]+$/.test(stripped) || stripped.length < 3) {
      return '正しい電話番号を入力してください';
    }
  }

  return undefined;
}

function validateAllFields(data: FormData): FormErrors {
  const errors: FormErrors = {};
  for (const key of ['name', 'address', 'phone', 'email'] as const) {
    const error = validateField(key, data[key]);
    if (error) errors[key] = error;
  }
  if (data.electricityServices.length === 0 && data.waterServices.length === 0) {
    errors.service = '修理・交換の内容を選択してください';
  }
  return errors;
}

const SUBMIT_TIMEOUT_MS = 30000;

const PRIVACY_POLICY_SECTIONS = [
  {
    title: '1.法令・規範の遵守',
    text: '株式会社設備人（以下「当社」と言います）は個人情報保護に関して適用される法令、国が定める指針その他の規範を遵守し、当社が保有する個人情報の保護に努めます。',
  },
  {
    title: '2.個人情報の取得、利用、提供',
    text: '当社は個人情報の利用目的を明確に定め、その目的達成のために必要な範囲で、公正かつ適正な手段により適切な個人情報の取得、利用及び提供を行います。また、特定された利用目的の達成に必要な範囲を超えた個人情報の取り扱い（以下、"目的外利用"という。）を行わないとともに、目的外利用が行われないための措置を講じます。',
  },
  {
    title: '3.個人情報の管理',
    text: '当社が保有する個人情報の漏えい、滅失又はき損等の防止に努め、厳正管理のもとで安全に蓄積、保管します。また、万一の発生時には速やかな是正措置を講じます。',
  },
];

export default function ContactForm({ formspreeId, phoneDisplay, phoneHref }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    phone: '',
    email: '',
    electricityServices: [],
    waterServices: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const isComposing = useRef(false);
  const isSubmitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (key: 'name' | 'address' | 'phone' | 'email', value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (touched[key] && errors[key]) {
      const error = validateField(key, value);
      setErrors((prev) => ({ ...prev, [key]: error }));
    }
  };

  const handleCheckboxChange = (group: 'electricityServices' | 'waterServices', value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [group]: checked
        ? [...prev[group], value]
        : prev[group].filter((v) => v !== value),
    }));
    if (touched.service && errors.service) {
      const newElec = group === 'electricityServices'
        ? (checked ? [...formData.electricityServices, value] : formData.electricityServices.filter(v => v !== value))
        : formData.electricityServices;
      const newWater = group === 'waterServices'
        ? (checked ? [...formData.waterServices, value] : formData.waterServices.filter(v => v !== value))
        : formData.waterServices;
      if (newElec.length > 0 || newWater.length > 0) {
        setErrors((prev) => ({ ...prev, service: undefined }));
      }
    }
  };

  const handleBlur = (key: 'name' | 'address' | 'phone' | 'email') => {
    isComposing.current = false;
    setTouched((prev) => ({ ...prev, [key]: true }));
    const error = validateField(key, formData[key]);
    setErrors((prev) => ({ ...prev, [key]: error }));
  };

  const focusFirstError = (fieldErrors: FormErrors) => {
    const fieldOrder = ['name', 'address', 'phone', 'email', 'service'] as const;
    const firstErrorKey = fieldOrder.find((k) => fieldErrors[k]);
    if (firstErrorKey) {
      const el = document.getElementById(`contact-${firstErrorKey === 'service' ? 'service-kinds-electricity' : firstErrorKey}`);
      el?.focus();
    }
  };

  useEffect(() => {
    if (submitState === 'success' || submitState === 'error') {
      feedbackRef.current?.focus();
    }
  }, [submitState]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isComposing.current || isSubmitting.current) return;

    const allErrors = validateAllFields(formData);
    setErrors(allErrors);
    setTouched({ name: true, address: true, phone: true, email: true, service: true });

    if (Object.keys(allErrors).length > 0) {
      focusFirstError(allErrors);
      return;
    }

    if (!formspreeId) {
      if (import.meta.env.DEV) console.warn('ContactForm: PUBLIC_FORMSPREE_ID is not set');
      setSubmitState('error');
      return;
    }

    isSubmitting.current = true;
    setSubmitState('submitting');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    const selectedServices = [
      ...formData.electricityServices,
      ...formData.waterServices,
    ].join(', ');

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          service: selectedServices,
          _gotcha: '',
        }),
        signal: controller.signal,
      });

      if (response.ok) {
        setSubmitState('success');
        setFormData({ name: '', address: '', phone: '', email: '', electricityServices: [], waterServices: [] });
        setTouched({});
        setErrors({});
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    } finally {
      clearTimeout(timeoutId);
      isSubmitting.current = false;
    }
  }, [formData, formspreeId]);

  const inputClass =
    'w-full h-[48px] px-[14px] py-[12px] rounded-[5px] border border-[#e0e0e0] bg-white text-[16px] placeholder:text-[#aaa] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B2A4A] focus:border-[#1B2A4A] transition-colors duration-200';
  const inputErrorClass =
    'w-full h-[48px] px-[14px] py-[12px] rounded-[5px] border border-[#E53935] bg-white text-[16px] placeholder:text-[#aaa] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B2A4A] focus:border-[#E53935] transition-colors duration-200';

  if (submitState === 'success') {
    return (
      <div
        ref={feedbackRef}
        tabIndex={-1}
        className="bg-[#e8f5e9] border border-[#4caf50] rounded p-6 text-center text-[#2e7d32] font-bold text-[15px] outline-none"
        role="alert"
        aria-live="polite"
      >
        お問い合わせありがとうございます。担当者より連絡いたします。
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="コンタクトフォーム" className="flex flex-col gap-[30px]">
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {submitState === 'error' && (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          className="bg-[#ffebee] border border-[#E53935] rounded p-4 text-[#c62828] text-[14px] outline-none"
          role="alert"
          aria-live="polite"
        >
          送信に失敗しました。お電話でもお問い合わせいただけます。
          <a href={phoneHref} className="font-bold underline ml-1">
            {phoneDisplay}
          </a>
        </div>
      )}

      {FIELDS.map(({ key, label, type, placeholder, autoComplete }) => {
        const fieldId = `contact-${key}`;
        const errorId = `${fieldId}-error`;
        const hasError = touched[key] && errors[key];

        return (
          <div key={key} className="grid grid-cols-1 md:grid-cols-[240px_1fr] md:gap-[45px] gap-[8px] items-center">
            <label htmlFor={fieldId} className="text-[18px] leading-[1.56] flex items-center justify-between md:pr-[37px]">
              {label}
              <span className="px-[8px] py-[1px] rounded-[5px] border border-[#fc4076] text-[12px] leading-[1.17] text-[#fc4076] ml-auto mt-[2px]">
                必須
              </span>
            </label>
            <div>
              <input
                id={fieldId}
                type={type}
                maxLength={400}
                autoComplete={autoComplete}
                placeholder={placeholder}
                value={formData[key]}
                onChange={(e) => handleTextChange(key, e.target.value)}
                onBlur={() => handleBlur(key)}
                onCompositionStart={() => { isComposing.current = true; }}
                onCompositionEnd={() => { isComposing.current = false; }}
                aria-required="true"
                aria-invalid={hasError ? 'true' : 'false'}
                aria-describedby={hasError ? errorId : undefined}
                className={hasError ? inputErrorClass : inputClass}
              />
              {hasError && (
                <p id={errorId} className="mt-1 text-[13px] text-[#E53935]" role="alert">
                  {errors[key]}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Service checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] md:gap-[45px] gap-[8px] items-start">
        <p className="text-[18px] leading-[1.56] flex items-center justify-between md:pr-[37px]">
          修理・交換の内容
          <span className="px-[8px] py-[1px] rounded-[5px] border border-[#fc4076] text-[12px] leading-[1.17] text-[#fc4076] ml-auto mt-[2px]">
            必須
          </span>
        </p>
        <div>
          <p className="text-[17px] leading-[1.65] mb-[10px]">電気まわりのトラブル</p>
          <div className="flex flex-wrap gap-[5px_26px] text-[16px] leading-[1.88] text-[#3b4043]" id="contact-service-kinds-electricity">
            {ELECTRICITY_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-[6px] cursor-pointer min-h-[44px]">
                <input
                  type="checkbox"
                  name="service-kinds-electricity[]"
                  value={opt}
                  checked={formData.electricityServices.includes(opt)}
                  onChange={(e) => handleCheckboxChange('electricityServices', opt, e.target.checked)}
                  className="w-[18px] h-[18px] accent-[#fc4076]"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          <p className="text-[17px] leading-[1.65] mb-[10px] mt-[30px]">水まわりのトラブル</p>
          <div className="flex flex-wrap gap-[5px_26px] text-[16px] leading-[1.88] text-[#3b4043]">
            {WATER_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-[6px] cursor-pointer min-h-[44px]">
                <input
                  type="checkbox"
                  name="service-kinds-sanitary[]"
                  value={opt}
                  checked={formData.waterServices.includes(opt)}
                  onChange={(e) => handleCheckboxChange('waterServices', opt, e.target.checked)}
                  className="w-[18px] h-[18px] accent-[#fc4076]"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          {touched.service && errors.service && (
            <p className="mt-2 text-[13px] text-[#E53935]" role="alert">
              {errors.service}
            </p>
          )}
        </div>
      </div>

      {/* Privacy policy inline */}
      <div className="mt-[50px]">
        <h3 className="text-[22px] font-bold text-center">プライバシーポリシー</h3>
        <div className="mt-[20px] p-[30px_43px_23px_30px] rounded-[5px] bg-white text-[14px] leading-[1.75] text-[#333]">
          {PRIVACY_POLICY_SECTIONS.map((section, i) => (
            <div key={i} className={i > 0 ? 'mt-[16px]' : ''}>
              <p className="font-bold">{section.title}</p>
              <p>{section.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitState === 'submitting'}
        className="w-[280px] min-h-[60px] flex justify-center items-center mx-auto mt-[40px] bg-[#ff4176] text-white text-[18px] font-bold rounded-[30px] shadow-[0_5px_0_0_rgba(0,0,0,0.3)] hover:translate-y-[5px] hover:shadow-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B2A4A]"
      >
        {submitState === 'submitting' ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            送信中...
          </>
        ) : (
          '送信'
        )}
      </button>
    </form>
  );
}
