import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function SocialLinks() {
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ icon: Icon, href }, index) => (
        <a
          key={index}
          href={href}
          className="text-gray-400 hover:text-purple-600 transition-colors"
        >
          <Icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
}