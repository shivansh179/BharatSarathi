import { TranslationKeys } from '@/types/translations';

import enCommon from './en/common.json';
import enHomepage from './en/homepage.json';
import enBenefits from './en/benefits.json';
import enFaq from './en/faq.json';
import enHowItWorks from './en/howItWorks.json';
import enSupport from './en/support.json';

import hiCommon from './hi-IN/common.json';
import hiHomepage from './hi-IN/homepage.json';
import hiBenefits from './hi-IN/benefits.json';
import hiFaq from './hi-IN/faq.json';
import hiHowItWorks from './hi-IN/howItWorks.json';
import hiSupport from './hi-IN/support.json';

import paCommon from './pa-IN/common.json';
import paHomepage from './pa-IN/homepage.json';
import paBenefits from './pa-IN/benefits.json';
import paFaq from './pa-IN/faq.json';
import paHowItWorks from './pa-IN/howItWorks.json';
import paSupport from './pa-IN/support.json';

import enRegistrationComplete from './en/registrationComplete.json';
import hiRegistrationComplete from './hi-IN/registrationComplete.json';
import paRegistrationComplete from './pa-IN/registrationComplete.json';



import enLogin from './en/login.json';
import hiLogin from './hi-IN/login.json';
import paLogin from './pa-IN/login.json';

import enDocumentUpload from './en/uploadDocuments.json';
import hiDocumentUpload from './hi-IN/uploadDocuments.json';
import paDocumentUpload from './pa-IN/uploadDocuments.json';



import enRegister from './en/register.json';
import hiRegister from './hi-IN/register.json';
import paRegister from './pa-IN/register.json';




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
    login : enLogin,
    documentUpload : enDocumentUpload,
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
    login : hiLogin,
    documentUpload : hiDocumentUpload,
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
    documentUpload : paDocumentUpload,
    register: paRegister,

  },
};