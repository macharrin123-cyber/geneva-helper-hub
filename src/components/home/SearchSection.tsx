import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchSection = ({ searchTerm, onSearchChange, onSearchSubmit }: SearchSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {t('home.title')}
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        {t('home.subtitle')}
      </p>
      
      <form onSubmit={onSearchSubmit} className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t('home.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-lg w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchSection;