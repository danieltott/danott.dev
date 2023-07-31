import clsx from "clsx"

export default function Title({ title, className }: { title: React.ReactNode, className?: string }) {
  return (<div className={clsx("page-title", className)}>
                <h1>{title}</h1>
                <span className="page-title-backdrop">{title}</span>
              </div>)
}
