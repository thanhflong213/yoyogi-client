import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl">
          <GraduationCap className="h-7 w-7 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Yoyogi
        </span>
        <span className="text-xs text-gray-500 font-medium -mt-1">
          予備校・オンライン模試
        </span>
      </div>
    </Link>
  );
};
