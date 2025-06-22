type TokenProps = {
  activityName: string
}

export default function Token({ activityName }: TokenProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="h-36 w-36 bg-purple-400/10 rounded-full flex items-center justify-center">
        <span className="text-purple-300 text-xs"></span>
      </div>
      <p className="text-sm text-purple-300 truncate w-full text-center">
        {activityName}
      </p>
    </div>
  )
}
