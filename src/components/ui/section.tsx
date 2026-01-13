interface SectionProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  rounded?: boolean;
}

export const Section = ({ children, className = "", title }: SectionProps) => {
  return (
    <section
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>
      )}
      {children}
    </section>
  );
};
