import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';

export interface ContactDetail {
  icon: LucideIcon;
  title: string;
  details: string[];
}

export interface FormField {
  id: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

export const contactContent = {
  title: 'Get in Touch',
  description:
    "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",

  form: {
    fields: [
      { id: 'name', label: 'Name', type: 'text' },
      { id: 'email', label: 'Email', type: 'email' },
      { id: 'message', label: 'Message', multiline: true, rows: 4 },
    ] satisfies FormField[],
    submit: 'Send Message',
    sending: 'Sending…',
    sent: 'Message Sent',
    success: "Thanks! We've got your message and will get back to you soon.",
  },

  /** Where the pin sits on the 3D globe. */
  location: { lat: 37.7749, lon: -122.4194, label: 'Fitness Fusion HQ · San Francisco, CA' },

  details: [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Fitness Street', 'San Francisco, CA 94105'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@fitnessfusion.com', 'support@fitnessfusion.com'],
    },
  ] satisfies ContactDetail[],
};
