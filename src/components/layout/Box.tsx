import { Header, HeaderType } from "./Header";

interface BoxType {
  children: React.ReactNode;
  className?: string;
  header?: HeaderType;
}
export const Box = ({ children, className = "", header }: BoxType) => {
  return (
    <div
      className={`layout-box flex w-full h-full  flex-col ${className}`.trim()}
    >
      {header && (
        <div className="flex-shrink-0">
          <Header header={header} />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-auto">{children}</div>
    </div>
  );
};
