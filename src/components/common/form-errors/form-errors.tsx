type TFormErrorsProps = {
  errors: string[];
};

export default function FormErrors({ errors }: TFormErrorsProps) {
  return <div className="rounded border border-red-400 bg-red-200 p-2">{errors.join(', ')}</div>;
}
