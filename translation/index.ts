// FILE: translations.ts (or your equivalent index/config file)

import { TranslationKeys } from '@/types/translations';

// English
import enCommon from './en/common.json';
import enHomepage from './en/homepage.json';
import enBenefits from './en/benefits.json';
import enFaq from './en/faq.json';
import enHowItWorks from './en/howItWorks.json';
import enSupport from './en/support.json';
import enRegistrationComplete from './en/registrationComplete.json';
import enLogin from './en/login.json';
import enDocumentUpload from './en/uploadDocuments.json';
import enRegister from './en/register.json';

// Hindi
import hiCommon from './hi-IN/common.json';
import hiHomepage from './hi-IN/homepage.json';
import hiBenefits from './hi-IN/benefits.json';
import hiFaq from './hi-IN/faq.json';
import hiHowItWorks from './hi-IN/howItWorks.json';
import hiSupport from './hi-IN/support.json';
import hiRegistrationComplete from './hi-IN/registrationComplete.json';
import hiLogin from './hi-IN/login.json';
import hiDocumentUpload from './hi-IN/uploadDocuments.json';
import hiRegister from './hi-IN/register.json';

// Punjabi
import paCommon from './pa-IN/common.json';
import paHomepage from './pa-IN/homepage.json';
import paBenefits from './pa-IN/benefits.json';
import paFaq from './pa-IN/faq.json';
import paHowItWorks from './pa-IN/howItWorks.json';
import paSupport from './pa-IN/support.json';
import paRegistrationComplete from './pa-IN/registrationComplete.json';
import paLogin from './pa-IN/login.json';
import paDocumentUpload from './pa-IN/uploadDocuments.json';
import paRegister from './pa-IN/register.json';


// Kannada
import kaCommon from './kan/common.json';
import kaHomepage from './kan/homepage.json';
import kaBenefits from './kan/benefits.json';
import kaFaq from './kan/faq.json';
import kaHowItWorks from './kan/howItWorks.json';
import kaSupport from './kan/support.json';
import kaRegistrationComplete from './kan/registrationComplete.json';
import kaLogin from './kan/login.json';
import kaDocumentUpload from './kan/uploadDocuments.json';
import kaRegister from './kan/register.json';


type AllTranslations = {
  [locale: string]: TranslationKeys;
};

export const translations: AllTranslations = {
  en: {
    common: enCommon,
    homepage: enHomepage,
    benefits: enBenefits,
    faq: enFaq,
    howItWorks: enHowItWorks,
    support: enSupport,
    registrationComplete: enRegistrationComplete,
    login: enLogin,
    documentUpload: enDocumentUpload,
    register: enRegister,
  },
  'hi-IN': {
    common: hiCommon,
    homepage: hiHomepage,
    benefits: hiBenefits,
    faq: hiFaq,
    howItWorks: hiHowItWorks,
    support: hiSupport,
    registrationComplete: hiRegistrationComplete,
    login: hiLogin,
    documentUpload: hiDocumentUpload,
    register: hiRegister,
  },
  'pa-IN': {
    common: paCommon,
    homepage: paHomepage,
    benefits: paBenefits,
    faq: paFaq,
    howItWorks: paHowItWorks,
    support: paSupport,
    registrationComplete: paRegistrationComplete,
    login: paLogin,
    documentUpload: paDocumentUpload,
    register: paRegister,
  },
  'kan': {
    common: kaCommon,
    homepage: kaHomepage,
    benefits: kaBenefits,
    faq: kaFaq,
    howItWorks: kaHowItWorks,
    support: kaSupport,
    registrationComplete: kaRegistrationComplete,
    login: kaLogin,
    documentUpload: kaDocumentUpload,
    register: kaRegister,
  },
};