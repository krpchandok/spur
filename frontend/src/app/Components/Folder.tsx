type FolderProps = {
  title: string
  children: React.ReactNode
}

export default function Folder({ title, children }: FolderProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {children}
    </div>
  )
}
