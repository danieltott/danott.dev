import clsx from "clsx"

export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
  return (<div className={clsx("page-title", className)}>
                <h1>{children}</h1>
                <span className="page-title-backdrop">{children}</span>
              </div>)
}
