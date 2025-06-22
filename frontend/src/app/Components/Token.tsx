interface TokenProps {
  activityName: string;
  activityType: string;
  image?: string;
}

export default function Token({ activityName, activityType, image }: TokenProps) {
  return (
    <div className="bg-white rounded-lg p-3 text-black shadow-lg">
      {image && (
        <img src={image} alt={activityName} className="w-full h-32 object-cover rounded-md mb-2" />
      )}
      <h3 className="font-bold">{activityName}</h3>
      <p className="text-sm text-gray-600">{activityType}</p>
    </div>
  );
}
