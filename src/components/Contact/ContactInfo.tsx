import { ContactInfoItem } from './ContactInfoItem';
import { contactContent } from './contactContent';

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {contactContent.details.map((item) => (
        <ContactInfoItem key={item.title} {...item} />
      ))}
    </div>
  );
}
