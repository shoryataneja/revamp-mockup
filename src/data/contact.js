import { MapPin, Mail, Phone } from 'lucide-react'
import { siteConfig } from '@data/siteConfig'

export const contactHeading = {
  title: "Let's Build Something Intelligent",
  subtitle:
    "Have a project in mind or want to explore how our AI products can transform your business? We'd love to hear from you.",
}

export const contactInfo = [
  {
    id: 'address',
    icon: MapPin,
    label: 'Our Office',
    lines: [
      '46/3A, Hosur Rd, Kudlu Gate',
      'Krishna Reddy Industrial Area, Hosapalaya',
      'Bengaluru, Karnataka 560068',
    ],
    href: siteConfig.address.mapsUrl,
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email Us',
    lines: ['business_pdai@populardigital.ai'],
    href: 'mailto:business_pdai@populardigital.ai',
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Call Us',
    lines: ['+91 8951732099'],
    href: 'tel:+918951732099',
  },
]


export const formFields = [
  { id: 'name',    label: 'Full Name',      type: 'text',     placeholder: 'John Smith',              required: true,  half: true  },
  { id: 'company', label: 'Company',        type: 'text',     placeholder: 'Acme Corp',               required: false, half: true  },
  { id: 'email',   label: 'Email Address',  type: 'email',    placeholder: 'john@acmecorp.com',       required: true,  half: true  },
  { id: 'phone',   label: 'Phone Number',   type: 'tel',      placeholder: '98765 43210',           required: false, half: true  },
  { id: 'subject', label: 'Subject',        type: 'text',     placeholder: 'How can we help you?',   required: true,  half: false },
  { id: 'message', label: 'Message',        type: 'textarea', placeholder: 'Tell us about your project, goals, and timeline...', required: true, half: false, rows: 5 },
]

export const validationRules = {
  name:    { minLength: 2,  message: 'Please enter your full name.' },
  email:   { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' },
  subject: { minLength: 3,  message: 'Please enter a subject.' },
  message: { minLength: 20, message: 'Message must be at least 20 characters.' },
  phone:   { pattern: /^[\d\s\-()]{6,}$/, message: 'Please enter a valid phone number.' },
}

export const countryCodes = [
  { code: '+91', label: 'India',      flag: '🇮🇳' },
  { code: '+1',  label: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', label: 'UK',         flag: '🇬🇧' },
  { code: '+971', label: 'UAE',       flag: '🇦🇪' },
  { code: '+65', label: 'Singapore',  flag: '🇸🇬' },
  { code: '+61', label: 'Australia',  flag: '🇦🇺' },
  { code: '+49', label: 'Germany',    flag: '🇩🇪' },
  { code: '+33', label: 'France',     flag: '🇫🇷' },
  { code: '+39', label: 'Italy',      flag: '🇮🇹' },
  { code: '+34', label: 'Spain',      flag: '🇪🇸' },
  { code: '+31', label: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', label: 'Sweden',     flag: '🇸🇪' },
  { code: '+47', label: 'Norway',     flag: '🇳🇴' },
  { code: '+45', label: 'Denmark',    flag: '🇩🇰' },
  { code: '+41', label: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', label: 'Austria',    flag: '🇦🇹' },
  { code: '+32', label: 'Belgium',    flag: '🇧🇪' },
  { code: '+353', label: 'Ireland',   flag: '🇮🇪' },
  { code: '+48', label: 'Poland',     flag: '🇵🇱' },
  { code: '+40', label: 'Romania',    flag: '🇷🇴' },
  { code: '+30', label: 'Greece',     flag: '🇬🇷' },
  { code: '+358', label: 'Finland',   flag: '🇫🇮' },
  { code: '+351', label: 'Portugal',  flag: '🇵🇹' },
  { code: '+90', label: 'Turkey',     flag: '🇹🇷' },
  { code: '+972', label: 'Israel',    flag: '🇮🇱' },
  { code: '+966', label: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', label: 'Qatar',     flag: '🇶🇦' },
  { code: '+968', label: 'Oman',      flag: '🇴🇲' },
  { code: '+965', label: 'Kuwait',    flag: '🇰🇼' },
  { code: '+973', label: 'Bahrain',   flag: '🇧🇭' },
  { code: '+880', label: 'Bangladesh', flag: '🇧🇩' },
  { code: '+94', label: 'Sri Lanka',  flag: '🇱🇰' },
  { code: '+977', label: 'Nepal',     flag: '🇳🇵' },
  { code: '+92', label: 'Pakistan',   flag: '🇵🇰' },
  { code: '+60', label: 'Malaysia',   flag: '🇲🇾' },
  { code: '+62', label: 'Indonesia',  flag: '🇮🇩' },
  { code: '+66', label: 'Thailand',   flag: '🇹🇭' },
  { code: '+84', label: 'Vietnam',    flag: '🇻🇳' },
  { code: '+63', label: 'Philippines', flag: '🇵🇭' },
  { code: '+81', label: 'Japan',      flag: '🇯🇵' },
  { code: '+82', label: 'South Korea', flag: '🇰🇷' },
  { code: '+86', label: 'China',      flag: '🇨🇳' },
  { code: '+852', label: 'Hong Kong', flag: '🇭🇰' },
  { code: '+64', label: 'New Zealand', flag: '🇳🇿' },
  { code: '+55', label: 'Brazil',     flag: '🇧🇷' },
  { code: '+52', label: 'Mexico',     flag: '🇲🇽' },
  { code: '+54', label: 'Argentina',  flag: '🇦🇷' },
  { code: '+27', label: 'South Africa', flag: '🇿🇦' },
  { code: '+234', label: 'Nigeria',   flag: '🇳🇬' },
  { code: '+254', label: 'Kenya',     flag: '🇰🇪' },
  { code: '+20', label: 'Egypt',      flag: '🇪🇬' },
]
