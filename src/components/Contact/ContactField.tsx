import type { FormField } from './contactContent';

const INPUT_CLASS =
  'w-full px-4 py-2 border outline-none border-line bg-page text-ink placeholder:text-mute rounded-lg focus:ring-2 focus:ring-ink focus:border-transparent';

/** One labelled form control – a text input, or a textarea when `multiline`. */
export function ContactField({ id, label, type = 'text', multiline, rows = 4 }: FormField) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} name={id} rows={rows} className={INPUT_CLASS} required />
      ) : (
        <input id={id} name={id} type={type} className={INPUT_CLASS} required />
      )}
    </div>
  );
}
