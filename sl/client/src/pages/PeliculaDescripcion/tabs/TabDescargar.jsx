import React from 'react';
import { Download, Server } from 'lucide-react';

const TabDescargar = () => {
  const servers = [
    { name: 'Mediafire', size: '2.4 GB', quality: '1080p', lang: 'Latino' },
    { name: 'Mega', size: '1.2 GB', quality: '720p', lang: 'Castellano' },
    { name: 'Google Drive', size: '4.8 GB', quality: '4K BlueRay', lang: 'Subtitulado' }
  ];

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
      {servers.map((server, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#3b82f6]/10 rounded-xl text-[#3b82f6]">
              <Server size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">{server.name}</p>
              <p className="text-[10px] text-gray-500 uppercase font-black">{server.quality} • {server.lang}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs font-bold text-gray-400">{server.size}</span>
            <button className="bg-[#3b82f6] p-2 rounded-lg group-hover:scale-110 transition-transform cursor-pointer">
              <Download size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabDescargar;