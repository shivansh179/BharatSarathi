import enCommon from '@/translation/en/common.json';
import enHomepage from '@/translation/en/homepage.json';
import enBenefits from '@/translation/en/benefits.json';
import enFaq from '@/translation/en/faq.json';
import enHowItWorks from '@/translation/en/howItWorks.json';
import enSupport from '@/translation/en/support.json';
import enRegistrationComplete from '@/translation/en/registrationComplete.json'
import enLogin from '@/translation/en/login.json';
import enDocumentUpload from '@/translation/en/uploadDocuments.json';
import enRegister from '@/translation/en/register.json';


export type BenefitItem = { title: string; description: string; };
export type FaqItem = { question: string; answer: string; };
export type ServiceItem = { title: string; description: string; };
export type StepItem = { title: string; description: string; };
export type RegistrationComplete = {title: string; description: string; };
export type Login = {title: string; description: string; };
export type documentUpload = {title: string; description: string; };
export type register = {title: string; description: string; };


export type TranslationKeys = {
  common: typeof enCommon;
  homepage: typeof enHomepage;
  benefits: typeof enBenefits;
  faq: typeof enFaq;
  howItWorks: typeof enHowItWorks;
  support: typeof enSupport;
  registrationComplete: typeof enRegistrationComplete;
  login : typeof enLogin;
  documentUpload : typeof enDocumentUpload;
  register: typeof enRegister;

};