export default function Loading({
  children,
  opacity = 0.8,
}: {
  children?: React.ReactNode;
  opacity?: number;
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        {children}
      </div>
    </div>
  );
}
