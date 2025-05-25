// src/app/upload-documents/documentConfig.ts
import {
    IdentificationIcon,
    CameraIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    TruckIcon,
  } from '@heroicons/react/24/outline';
  
  export type DocumentTypeKey = "AADHAAR" | "SELFIE" | "RC" | "INSURANCE" | "POLLUTION" | "MCD_FITNESS" | "CAR_INTERIOR" | "CAR_EXTERIOR";
  
  export interface DocumentUploadConfig {
    key: DocumentTypeKey;
    label: string;
    icon: React.ElementType;
    requiresAadhaarNumber?: boolean;
    accept?: string;
    hasCameraOption?: boolean; // New flag for Selfie
  }
  
  export const DOCUMENT_TYPES: DocumentUploadConfig[] = [
    { key: "AADHAAR", label: "Aadhaar Card", icon: IdentificationIcon, requiresAadhaarNumber: true, accept: "image/*,.pdf" },
    { key: "SELFIE", label: "Your Selfie", icon: CameraIcon, accept: "image/*", hasCameraOption: true }, // Added hasCameraOption
    { key: "RC", label: "Vehicle RC", icon: DocumentTextIcon, accept: "image/*,.pdf" },
    { key: "INSURANCE", label: "Vehicle Insurance", icon: ShieldCheckIcon, accept: "image/*,.pdf" },
    { key: "POLLUTION", label: "Pollution Certificate (PUC)", icon: ShieldCheckIcon, accept: "image/*,.pdf" },
    { key: "MCD_FITNESS", label: "MCD/Fitness Certificate", icon: ShieldCheckIcon, accept: "image/*,.pdf" },
    { key: "CAR_INTERIOR", label: "Car Interior Photo", icon: TruckIcon, accept: "image/*" },
    { key: "CAR_EXTERIOR", label: "Car Exterior Photo", icon: TruckIcon, accept: "image/*" },
  ];