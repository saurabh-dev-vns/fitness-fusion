import type { ContactDetail } from './contactContent';

export function ContactInfoItem({ icon: Icon, title, details }: ContactDetail) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-card border border-line p-3 rounded-lg">
        <Icon className="w-6 h-6 text-ink" aria-hidden />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        {details.map((detail) => (
          <p key={detail} className="text-mute">
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
}
