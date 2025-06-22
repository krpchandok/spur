interface TokenProps {
  activityName: string;
  activityType: string;
  image?: string;
}

function Token({ activityName, image }: TokenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-2 transform transition-transform duration-300 hover:scale-105 group">
      <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 bg-white/5 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm overflow-hidden relative group-hover:border-purple-400 transition-colors">
        {image ? (
            <img src={image} alt={activityName} className="w-full h-full object-cover"/>
        ) : (
            <span className="text-4xl font-light text-white/70">{activityName.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <p className="mt-3 text-sm text-white/80 truncate w-full text-center font-light tracking-wide">
        {activityName}
      </p>
    </div>
  )
}

export default Token;
