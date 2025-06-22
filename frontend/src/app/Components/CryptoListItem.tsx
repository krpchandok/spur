import React from 'react';

// A simple sparkline SVG component
const Sparkline = ({ data, positive }: { data: number[], positive: boolean }) => {
  const color = positive ? '#10B981' : '#EF4444'; // Green for positive, Red for negative
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 70},${30 - d}`).join(' ');

  return (
    <svg width="70" height="30" viewBox="0 0 70 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points={points} stroke={color} strokeWidth="2" fill="none" />
      <defs>
        <linearGradient id={`gradient-${positive}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={`0,30 ${points} 70,30`} fill={`url(#gradient-${positive})`} />
    </svg>
  );
};

interface CryptoListItemProps {
  icon: React.ReactNode;
  name: string;
  ticker: string;
  price: string;
  change: string;
  positive: boolean;
  graphData: number[];
}

const CryptoListItem: React.FC<CryptoListItemProps> = ({ icon, name, ticker, price, change, positive, graphData }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors duration-200">
      <div className="flex items-center">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 mr-4">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-gray-400">{ticker}</p>
        </div>
      </div>
      <div className="hidden sm:block">
        <Sparkline data={graphData} positive={positive} />
      </div>
      <div className="text-right">
        <p className="font-semibold text-white">{price}</p>
        <p className={`text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
      </div>
    </div>
  );
};

export default CryptoListItem; 