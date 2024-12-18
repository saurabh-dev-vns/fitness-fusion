import { MapPin, Phone, Mail } from 'lucide-react';

export function ContactInfo() {
  const contactDetails = [
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
  ];

  return (
    <div className="space-y-8">
      {contactDetails.map((item) => (
        <div key={item.title} className="flex items-start space-x-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <item.icon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
            {item.details.map((detail, index) => (
              <p key={index} className="text-gray-600">{detail}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}